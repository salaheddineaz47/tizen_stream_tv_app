export interface NavigationItem {
  id: string;
  element: HTMLElement | null;
  onSelect?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class TVNavigation {
  private items: Map<string, NavigationItem> = new Map();
  private currentFocus: string | null = null;
  private grid: string[][] = [];
  private numberBuffer = "";
  private numberTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.setupKeyListeners();
  }

  private setupKeyListeners() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.addEventListener("keydown", (e) => {
        // Handle number keys for direct navigation (useful for channel selection)
        if (e.key >= "0" && e.key <= "9") {
          this.handleNumberKey(e.key);
          return;
        }

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            this.navigateUp();
            break;
          case "ArrowDown":
            e.preventDefault();
            this.navigateDown();
            break;
          case "ArrowLeft":
            e.preventDefault();
            this.navigateLeft();
            break;
          case "ArrowRight":
            e.preventDefault();
            this.navigateRight();
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            this.selectCurrent();
            break;
          case "Escape":
          case "Backspace":
            e.preventDefault();
            this.goBack();
            break;
          case "Home":
            e.preventDefault();
            this.goHome();
            break;
          case "PageUp":
            e.preventDefault();
            this.pageUp();
            break;
          case "PageDown":
            e.preventDefault();
            this.pageDown();
            break;
        }
      });
    }
  }

  private handleNumberKey(key: string) {
    this.numberBuffer += key;

    // Clear existing timeout
    if (this.numberTimeout) {
      clearTimeout(this.numberTimeout);
    }

    // Set timeout to process number after 1.5 seconds
    this.numberTimeout = setTimeout(() => {
      this.processNumberInput();
    }, 1500);
  }

  private processNumberInput() {
    const number = Number.parseInt(this.numberBuffer);
    this.numberBuffer = "";

    // Try to navigate to channel by number (useful for Live TV)
    const channelId = `channel-${number - 1}`; // Convert to 0-based index
    if (this.items.has(channelId)) {
      this.focus(channelId);
      // Auto-select after focusing
      setTimeout(() => {
        this.selectCurrent();
      }, 500);
    }
  }

  registerItem(item: NavigationItem) {
    this.items.set(item.id, item);
    if (item.element) {
      item.element.tabIndex = -1;
      item.element.classList.add("focusable");
    }
  }

  unregisterItem(id: string) {
    this.items.delete(id);
  }

  setGrid(grid: string[][]) {
    this.grid = grid;
  }

  focus(id: string) {
    if (this.currentFocus) {
      const currentItem = this.items.get(this.currentFocus);
      currentItem?.element?.blur();
      currentItem?.element?.classList.remove("tv-focused");
      currentItem?.onBlur?.();
    }

    this.currentFocus = id;
    const item = this.items.get(id);
    if (item?.element) {
      item.element.focus();
      item.element.classList.add("tv-focused");
      item.element.scrollIntoView({ behavior: "smooth", block: "center" });
      item.onFocus?.();
    }
  }

  private findInGrid(id: string): [number, number] | null {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === id) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private navigateUp() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    if (row > 0) {
      const targetRow = this.grid[row - 1];
      let offset = 0;
      let found = false;
      while (!found && (col - offset >= 0 || col + offset < targetRow.length)) {
        if (col - offset >= 0) {
          const newId = targetRow[col - offset];
          if (newId && this.items.has(newId)) {
            this.focus(newId);
            found = true;
            break;
          }
        }
        if (offset !== 0 && col + offset < targetRow.length) {
          const newId = targetRow[col + offset];
          if (newId && this.items.has(newId)) {
            this.focus(newId);
            found = true;
            break;
          }
        }
        offset++;
      }
    }
  }

  private navigateDown() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    if (row < this.grid.length - 1) {
      const targetRow = this.grid[row + 1];
      let offset = 0;
      let found = false;
      while (!found && (col - offset >= 0 || col + offset < targetRow.length)) {
        if (col - offset >= 0) {
          const newId = targetRow[col - offset];
          if (newId && this.items.has(newId)) {
            this.focus(newId);
            found = true;
            break;
          }
        }
        if (offset !== 0 && col + offset < targetRow.length) {
          const newId = targetRow[col + offset];
          if (newId && this.items.has(newId)) {
            this.focus(newId);
            found = true;
            break;
          }
        }
        offset++;
      }
    }
  }

  private navigateLeft() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    if (col > 0) {
      const newId = this.grid[row][col - 1];
      if (newId && this.items.has(newId)) {
        this.focus(newId);
      }
    }
  }

  private navigateRight() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    if (col < this.grid[row].length - 1) {
      const newId = this.grid[row][col + 1];
      if (newId && this.items.has(newId)) {
        this.focus(newId);
      }
    }
  }

  private selectCurrent() {
    if (this.currentFocus) {
      const item = this.items.get(this.currentFocus);
      item?.onSelect?.();
    }
  }

  private goBack() {
    // Handle back navigation - can be customized per page
    window.history.back();
  }

  private pageUp() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    const newRow = Math.max(0, row - 3); // Jump 3 rows up
    if (this.grid[newRow] && this.grid[newRow][col]) {
      const newId = this.grid[newRow][col];
      if (newId && this.items.has(newId)) {
        this.focus(newId);
      }
    }
  }

  private pageDown() {
    if (!this.currentFocus) return;
    const pos = this.findInGrid(this.currentFocus);
    if (!pos) return;

    const [row, col] = pos;
    const newRow = Math.min(this.grid.length - 1, row + 3); // Jump 3 rows down
    if (this.grid[newRow] && this.grid[newRow][col]) {
      const newId = this.grid[newRow][col];
      if (newId && this.items.has(newId)) {
        this.focus(newId);
      }
    }
  }

  private goHome() {
    // Navigate to home page
    window.location.href = "/";
  }

  getCurrentFocus(): string | null {
    return this.currentFocus;
  }

  clearNumberBuffer() {
    this.numberBuffer = "";
    if (this.numberTimeout) {
      clearTimeout(this.numberTimeout);
      this.numberTimeout = null;
    }
  }
}

export const tvNavigation = new TVNavigation();

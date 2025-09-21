import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function SearchCta({
  handleSearch,
}: {
  handleSearch: () => void;
}) {
  return (
    <Button
      id="search"
      ref={searchRef}
      variant="ghost"
      size="lg"
      className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 px-6"
      onClick={handleSearch}
      tabIndex={-1}
    >
      <Search className="w-5 h-5 mr-3" />
      Search
    </Button>
  );
}

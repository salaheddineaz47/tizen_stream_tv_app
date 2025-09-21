function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Circle/Badge Logo */}
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary shadow-lg">
        <span className="text-xl font-extrabold text-white">TV</span>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col leading-tight">
        <span className="text-white text-2xl font-bold tracking-wide">
          Stream<span className="text-primary">App</span>
        </span>
        <span className="text-xs text-gray-200 uppercase tracking-widest">
          Stream. Relax. Enjoy.
        </span>
      </div>
    </div>
  );
}

export default Logo;

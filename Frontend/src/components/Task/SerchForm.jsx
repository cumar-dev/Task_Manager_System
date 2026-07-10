import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center gap-2 bg-[#f0f0f0] rounded-full px-2 py-1.5 mx-3 w-full max-w-md border border-transparent focus-within:border-[#e5e5e5] focus-within:bg-white transition-all">
      <Search size={15} className="text-muted-foreground ml-2 shrink-0" />

      <Input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleChange}
        className="flex-1 h-7 bg-transparent border-0 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground px-1"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-[#e5e5e5] text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
};

export default SearchForm;
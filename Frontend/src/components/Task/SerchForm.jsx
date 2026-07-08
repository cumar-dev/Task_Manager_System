import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm mx-4 my-5">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleChange}
        className="pl-9 h-9 rounded-full bg-[#f0f0f0] border-0 text-sm focus-visible:ring-1 focus-visible:ring-[#e5e5e5]"
      />
    </div>
  );
};

export default SearchForm;
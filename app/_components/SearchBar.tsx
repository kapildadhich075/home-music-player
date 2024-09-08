import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  searchQuery,
  handleSearchChange,
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <input
        type="search"
        name="track"
        id="track"
        placeholder="Search Song, Artist"
        className="w-full p-4 pr-10 text-white bg-gray-700/75 rounded-lg"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <BiSearch
        size={24}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

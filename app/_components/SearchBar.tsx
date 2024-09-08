import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  searchQuery: string; // Represents the current search query
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for search input change
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
        value={searchQuery} // Binds the input value to the searchQuery state
        onChange={handleSearchChange} // Calls the handleSearchChange function on input change
      />
      <BiSearch
        size={24}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

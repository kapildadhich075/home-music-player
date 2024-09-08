import React from "react";
import { Song } from "../_hooks/useFetchSongs";

interface SongListRendererProps {
  songs: Song[]; // Array of songs
  originalSongs: Song[]; // Array of original songs
  currentIndex: number; // Index of the current song
  setCurrentIndex: (index: number) => void; // Function to set the current index
  songDurations: { [key: string]: number }; // Object containing song durations
  formatDuration: (time: number) => string; // Function to format duration
}

const SongListRenderer: React.FC<SongListRendererProps> = ({
  songs,
  originalSongs,
  currentIndex,
  setCurrentIndex,
  songDurations,
  formatDuration,
}) => {
  const handleSongClick = (songId: string) => {
    const originalIndex = originalSongs.findIndex((song) => song.id === songId); // Find the index of the clicked song in the original songs array
    if (originalIndex !== -1) {
      setCurrentIndex(originalIndex); // Set the current index to the found index
    }
  };

  return (
    <div className="flex flex-col max-h-[850px] overflow-y-auto justify-between scrollbar-hide p-4 rounded-lg">
      {songs.length > 0 ? (
        songs.map((song: Song, index: number) => (
          <div
            key={song.id}
            className={`flex items-center cursor-pointer justify-between p-4 my-2 rounded-lg ${
              index === currentIndex
                ? "bg-gray-300/25" // Apply background color if the song is the current song
                : "bg-transparent hover:bg-gray-700/80" // Apply background color on hover
            }`}
            onClick={() => {
              handleSongClick(song.id); // Call the handleSongClick function when a song is clicked
              console.log("Song clicked", song.id); // Log the clicked song ID to the console
            }}
          >
            <div className="flex items-center">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`} // Image source URL
                alt={song.title} // Image alt text
                className="w-14 h-14 object-cover rounded-full" // Image styling
              />
              <div className="ml-4">
                <h1 className="font-bold text-xl">{song.name}</h1> // Song name
                <p className="text-sm text-gray-300/75">{song.artist}</p> //
                Song artist
              </div>
            </div>
            <h1 className="text-sm text-gray-300/75">
              {formatDuration(songDurations[song.id] || 0)} // Format and
              display the song duration
            </h1>
          </div>
        ))
      ) : (
        <div className="text-white text-center">No songs found</div> // Display a message if no songs are found
      )}
    </div>
  );
};

export default SongListRenderer;

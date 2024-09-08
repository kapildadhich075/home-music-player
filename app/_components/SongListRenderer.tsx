import React from "react";
import { Song } from "../_hooks/useFetchSongs";

interface SongListRendererProps {
  songs: Song[];
  originalSongs: Song[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  songDurations: { [key: string]: number };
  formatDuration: (time: number) => string;
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
    const originalIndex = originalSongs.findIndex((song) => song.id === songId);
    if (originalIndex !== -1) {
      setCurrentIndex(originalIndex);
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
                ? "bg-gray-300/25"
                : "bg-transparent hover:bg-gray-700/80"
            }`}
            onClick={() => {
              handleSongClick(song.id);
              console.log("Song clicked", song.id);
            }}
          >
            <div className="flex items-center">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.title}
                className="w-14 h-14 object-cover rounded-full"
              />
              <div className="ml-4">
                <h1 className="font-bold text-xl">{song.name}</h1>
                <p className="text-sm text-gray-300/75">{song.artist}</p>
              </div>
            </div>
            <h1 className="text-sm text-gray-300/75">
              {formatDuration(songDurations[song.id] || 0)}
            </h1>
          </div>
        ))
      ) : (
        <div className="text-white text-center">No songs found</div>
      )}
    </div>
  );
};

export default SongListRenderer;

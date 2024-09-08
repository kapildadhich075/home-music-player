import React, { useState, useEffect, Suspense, lazy } from "react";
import { Song } from "../_hooks/useFetchSongs";
import { SearchBar } from "./SearchBar";

// Lazy load the song list renderer
const SongListRenderer = lazy(() => import("./SongListRenderer"));

interface SongListProps {
  songs: Song[]; // Array of songs
  currentIndex: number; // Index of the currently selected song
  setCurrentIndex: (index: number) => void; // Function to set the current index
  type: "For You" | "Top Tracks"; // Type of song list
  setType: (type: "For You" | "Top Tracks") => void; // Function to set the type
}

const SongList: React.FC<SongListProps> = ({
  songs,
  currentIndex,
  setCurrentIndex,
  type,
  setType,
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs); // State for filtered songs
  const [songDurations, setSongDurations] = useState<{ [key: string]: number }>(
    {} // State for song durations
  );

  useEffect(() => {
    const loadDurations = async () => {
      const durations: { [key: string]: number } = {};
      for (const song of songs) {
        const audio = new Audio(song.url);
        await new Promise((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            durations[song.id] = audio.duration;
            resolve(null);
          });
        });
      }
      setSongDurations(durations);
    };

    loadDurations();
  }, [songs]);

  useEffect(() => {
    const filtered = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchQuery, songs]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const formatDuration = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col w-1/4 justify-start p-10 mt-2 h-screen">
      <div className="flex flex-col justify-between">
        <div className="flex gap-5 p-4">
          {/* Button to set type as "For You" */}
          <button
            onClick={() => setType("For You")}
            className={`${
              type === "For You"
                ? "text-white font-bold text-2xl"
                : "text-gray-400 font-bold text-2xl"
            } `}
          >
            For You
          </button>
          {/* Button to set type as "Top Tracks" */}
          <button
            onClick={() => setType("Top Tracks")}
            className={`${
              type === "Top Tracks"
                ? "text-white font-bold text-2xl"
                : "text-gray-400 font-bold text-2xl"
            }  `}
          >
            Top Tracks
          </button>
        </div>

        {/* Search bar component */}
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <Suspense
          fallback={
            <div className="flex justify-center items-center mt-10  animate-bg-fade">
              <div className="text-white">
                <div className="relative h-10 w-10 ">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-300 animate-spin"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"
                    style={{ animationDuration: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
          }
        >
          {/* Lazy loaded SongListRenderer component */}
          <SongListRenderer
            songs={
              type === "For You"
                ? filteredSongs
                : filteredSongs.filter((song: Song) => song.top_track)
            }
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            songDurations={songDurations}
            formatDuration={formatDuration}
            originalSongs={songs}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SongList;

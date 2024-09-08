// SongList.tsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Song } from "../_hooks/useFetchSongs";
import { SearchBar } from "./SearchBar";

// Lazy load the song list renderer
const SongListRenderer = lazy(() => import("./SongListRenderer"));

interface SongListProps {
  songs: Song[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  type: "For You" | "Top Tracks";
  setType: (type: "For You" | "Top Tracks") => void;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  currentIndex,
  setCurrentIndex,
  type,
  setType,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);
  const [songDurations, setSongDurations] = useState<{ [key: string]: number }>(
    {}
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
    <div className="flex flex-col w-1/4 justify-start h-screen p-10 mt-2">
      <div className="flex flex-col justify-between">
        <div className="flex gap-5 p-4">
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

        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <Suspense fallback={<div className="text-white">Loading songs...</div>}>
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
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SongList;

"use client";

import { useRef, useState, useMemo } from "react";
import useFetchSongs, { Song } from "../_hooks/useFetchSongs";
import { MusicLogo, ProfileImage } from "./Logo";
import CustomAudioPlayer from "./CustomPlayer";
import SongList from "./SongList";

const MusicPlayer = () => {
  const { songs, loading, error } = useFetchSongs(
    "https://cms.samespace.com/items/songs"
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [type, setType] = useState("For You");
  const [searchQuery] = useState("");

  // Remove the .data access, as songs is already an array
  const songList = useMemo(() => songs || [], [songs]);

  const filteredSongs = useMemo(() => {
    if (type === "Top Tracks") {
      return songList.filter((song: Song) => song.top_track);
    }
    return songList.filter(
      (song: Song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songList, type, searchQuery]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % filteredSongs.length;
      if (!isPlaying && audioRef.current !== null) {
        audioRef.current.play();
      }
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + filteredSongs.length) % filteredSongs.length;
      if (!isPlaying && audioRef.current !== null) {
        audioRef.current.play();
      }
      return newIndex;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-700 to-black animate-bg-fade">
        <div className="relative h-10 w-10 ">
          <div className="absolute inset-0 rounded-full border-4 border-slate-300 animate-spin"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-700 to-black animate-bg-fade">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center bg-gradient-to-br from-slate-700 to-black text-white min-h-screen overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col items-center w-1/4 h-screen justify-between p-8 top-0 z-20">
        <MusicLogo />
        <ProfileImage />
      </div>

      <SongList
        songs={filteredSongs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setType={setType}
        type={type}
      />

      <CustomAudioPlayer
        filteredSongs={filteredSongs}
        currentIndex={currentIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
};

export default MusicPlayer;

import { useState, useEffect } from "react";
import axios from "axios";

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  sort: number;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  accent: string;
  top_track: boolean;
}

const useFetchSongs = (url: string) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching songs");
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { songs, loading, error };
};

export default useFetchSongs;

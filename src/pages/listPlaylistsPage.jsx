import React, { useEffect } from "react";
import Spinner from "../components/spinner";
import { getPlaylists } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";
import PlaylistList from '../components/playlistList';

const ListPlaylistsPage = () => {
  const [playlists, setPlaylists] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();

  async function getLists(userId) {
    const lists = await getPlaylists(userId);
    setPlaylists(lists);
    setFetched(true);
  }

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        setTimeout(async () => getLists(user?.user.id), 100);
      } else {
        setTimeout(async () => getLists(user?.user.id), 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  async function reload() {
    setFetched(false);
    if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
      setTimeout(async () => getLists(user?.user.id), 100);
    }
    setFetched(true);
  }

  return (
    <>
      <PlaylistList playlists={playlists} reload={reload}/>
    </>
  );
};

export default ListPlaylistsPage;

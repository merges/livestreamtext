import createPersistedState from 'use-persisted-state';
const useArtistState = createPersistedState('artist');

const useArtist = initialArtist => {
  const [artist, setArtist] = useArtistState(initialArtist);
  return [
    artist,
    setArtist,
  ];
};

export default useArtist;

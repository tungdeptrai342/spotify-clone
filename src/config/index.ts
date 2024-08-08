import { useEffect } from 'react';

const useSpotifyAuth = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      localStorage.setItem('spotifyToken', token);
      window.location.hash = ''; // Clear hash
    }
  }, []);
};

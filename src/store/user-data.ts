import { useState, useEffect } from 'react';

const RECENT_KEY = 'calit-recent-tools';
const FAVORITES_KEY = 'calit-favorite-tools';
const MAX_RECENT = 10;

export function useUserData() {
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem(RECENT_KEY);
      if (storedRecent) setRecent(JSON.parse(storedRecent));

      const storedFavs = localStorage.getItem(FAVORITES_KEY);
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
    } catch (e) {
      // Silently ignore local storage errors
    }
  }, []);

  const addRecent = (slug: string) => {
    setRecent(prev => {
      const filtered = prev.filter(item => item !== slug);
      const updated = [slug, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(slug);
      let updated;
      if (isFav) {
        updated = prev.filter(item => item !== slug);
      } else {
        updated = [...prev, slug];
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recent, favorites, addRecent, toggleFavorite };
}

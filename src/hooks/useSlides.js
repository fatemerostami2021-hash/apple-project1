import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/slides`);
        setSlides(res.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching slides:', err.message);
        setError(err.message);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  return { slides, loading, error };
}

// useHotels.js
import { useEffect, useState } from "react";
import { listHotel } from "@/app/services/api";

const useHotels = () => {
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      const hotelData = await listHotel();
      console.log("Données d'hôtel récupérées :", hotelData);
      setHotels(hotelData);
    } catch (err) {
      console.error("Error recuperation hotels:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, loading, error, fetchHotels };
};

export default useHotels;

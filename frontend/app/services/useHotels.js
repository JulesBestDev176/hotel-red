import { useEffect, useState } from "react";
import { listHotel } from "@/app/services/api";

const useHotels = () => {
  const [allHotels, setAllHotels] = useState(null); // Stocke tous les hôtels récupérés au début
  const [hotels, setHotels] = useState(null); // Stocke la liste filtrée
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterHotels = async (searchName) => {
    if (!searchName || searchName.trim() === "") {
      try {
        const hotelData = await listHotel();
        console.log("Données d'hôtel récupérées :", hotelData);

        const hotelsList = hotelData.data || []; // Assurez-vous que c'est un tableau
        setAllHotels(hotelsList); // Stocke les données non filtrées dans allHotels
        setHotels(hotelsList); // Initialement, met hotels à la liste complète
      } catch (err) {
        console.error("Erreur de récupération des hôtels :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      const regex = new RegExp(`^${searchName}`, "i");

      if (allHotels) {
        // Vérifiez si allHotels est défini
        const filteredHotels = allHotels.filter((hotel) =>
          regex.test(hotel.nom)
        );
        console.log(filteredHotels);
        setHotels(filteredHotels); // Mettez à jour uniquement hotels
      }
    }
  };
  useEffect(() => {
    filterHotels("");
  }, []);

  useEffect(() => {
    filterHotels(name); // Applique le filtre chaque fois que 'name' change
  }, [name]);

  return {
    hotels,
    loading,
    error,
    setName,
  };
};

export default useHotels;

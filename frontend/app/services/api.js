import axios from "axios";

// ""
const API_URL = "https://hotel-red.onrender.com/api";
// const API_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Augmenter le timeout à 5 secondes
});

// Intercepteur de requête pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    // Exclure les requêtes de connexion et d'inscription
    if (config.url !== "/login" && config.url !== "/signup") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour s'inscrire
export const signup = async (userData) => {
  try {
    const response = await apiClient.post("/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription : ", error);
    throw error;
  }
};

// Fonction pour se connecter
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    localStorage.setItem("user", response.data);
    localStorage.setItem("token", response.data.token); // Stocker le token
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion : ", error);
    throw error;
  }
};

// Recuperer l'utilisateur connecter
export const getUserConnected = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Aucun token trouvé. Veuillez vous connecter.");
    }

    const response = await apiClient.get("/getUser");

    localStorage.setItem("user", JSON.stringify(response.data.data));

    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur : ", error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const signout = async () => {
  try {
    const response = await apiClient.post(
      "/signout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("token"); // Supprimer le token lors de la déconnexion
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion : ", error);
    throw error;
  }
};

// Fonction pour lister les hôtels
export const listHotel = async () => {
  try {
    const response = await apiClient.get("/hotels", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des hôtels : ", error);
    throw error;
  }
};

// Ajouter un hotel
export const addHotel = async (hotelData) => {
  try {
    const response = await apiClient.post("/addHotel", hotelData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'hôtel : ", error);
    throw error;
  }
};

// Envoyer un mail

export const sendResetEmail = async (email) => {
  try {
    const response = await apiClient.post("/send-mail", email);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
    throw error;
  }
};

export const changePassword = async ({ passwords }, email) => {
  try {
    const response = await apiClient.patch(`/change-password`, {
      password1: passwords.password1,
      password2: passwords.password2,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur la modification du mot de passe : ", error);
    throw error;
  }
};

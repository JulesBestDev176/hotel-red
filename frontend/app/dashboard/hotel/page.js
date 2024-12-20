"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { addHotel } from "@/app/services/api";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Toast from "@/app/components/Toast";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const HotelDiv = styled.div`
  height: 90%;
  width: 40%;
  background-color: white;
  border-radius: 12px;
  padding: 20px 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: rgba(85, 85, 85, 1);
  border-bottom: 2px dashed #ccc;
  padding: 10px;
`;

const Form = styled.form`
  padding: 30px 10px;

  .form-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    width: 100%;
    margin-bottom: 20px;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  input,
  select {
    margin-top: 10px;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 80%;
    background-color: white;
    color: black;
    &::placeholder {
      color: #55595c;
    }
  }
  input.filled {
    background-color: white;
  }
  select {
    width: 90%;
  }
  input[type="file"] {
    position: absolute;
    top: auto;
    left: auto;
    width: 90%;
    height: 80%;
    text-align: center;
    transform: translateY(-3%);
    cursor: pointer;
    opacity: 0;
  }

  .photo {
    margin-top: 10px;
    height: 120px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 30px;
    color: #ccc;
  }
  .text {
    font-size: 20px;
  }
  .bottom {
    width: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #555555;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const Message = styled.div`
  padding: 0;
  margin-top: 5px;
  margin-left: 10px;
  height: 10px;
`;

export const ErrorMessage = styled.p`
  color: red !important;
  font-size: 10px !important;
`;

export const SuccessMessage = styled.p`
  color: green !important;
  font-size: 10px !important;
`;

const Hotel = ({ isOpen, onClose, refreshPage }) => {
  // const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [prix, setPrix] = useState("");
  const [devise, setDevise] = useState("XOF");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [verif, setVerif] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [color, setColor] = useState("green");
  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    tel: "",
    prix: "",
  });

  const validateNom = (value) => {
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        nom: "Le nom ne doit pas être vide.",
      }));
    } else if (value.length <= 1) {
      setErrors((prev) => ({ ...prev, nom: "Au moins 2 caracteres." }));
    } else if (/\d/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        nom: "Le nom ne doit pas contenir de chiffre.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, nom: "" }));
    }
  };

  const validateTel = (value) => {
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        tel: "Le numéro de téléphone ne doit pas être vide.",
      }));
    } else if (!/^\+221(70|75|76|77|78)\d{7}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        tel: "Le numéro doit commencer par +221, suivi de 70, 75, 76, 77, ou 78.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, tel: "" }));
    }
  };
  const validatePrix = (value) => {
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        prix: "Le prix ne doit pas être vide.",
      }));
    } else if (!/^\d+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        prix: "Le prix doit être un entier positif.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, prix: "" }));
    }
  };

  const validateEmail = (value) => {
    setErrors("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        email: "L'Email ne doit pas être vide",
      }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Veuillez entrer un email valide.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };
    fetchData();
  }, []);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImage(selectedFile);

      const imageURL = URL.createObjectURL(selectedFile);
      document.querySelector(
        ".photo"
      ).style.backgroundImage = `url(${imageURL})`;
      document.querySelector(".photo").style.backgroundSize = "cover";
      document.querySelector(".photo").style.backgroundPosition = "center";
      setVerif(false);
    } else {
      console.error("Selected file is not a valid image");
    }
  };

  //   const fetchUser = async () => {
  //     try {
  //       const userData = await getUserConnected();
  //       setUser(userData);
  //       console.log(userData);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération de l'utilisateur : ",
  //         error
  //       );
  //     }
  //   };

  //   const fetchHotels = async () => {
  //     try {
  //       const hotelData = await listHotel();
  //       setHotels(hotelData);
  //     } catch (error) {
  //       console.error("Error fetching hotels:", error);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage("");
    const phoneRegex = /^[+0-9]*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setColor("green");
    if (!phoneRegex.test(tel)) {
      setToastMessage(
        "Le numéro de téléphone est invalide. Il ne doit contenir que des chiffres ou le signe '+'"
      );
      setColor("red");
      return;
    }

    if (!emailRegex.test(email)) {
      setToastMessage(
        "L'email est invalide. Assurez-vous qu'il a le bon format (exemple@domaine.com)."
      );
      setColor("red");
      return;
    }

    // Create a FormData object to handle the image upload
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("adresse", adresse);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("prix", prix);
    formData.append("devise", devise);
    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await addHotel(formData);

      setNom("");
      setAdresse("");
      setEmail("");
      setTel("");
      setPrix("");
      setImage("");
      setColor("green");
      console.log("Hotel ajouté avec succés:", result);
      setToastMessage("Hotel ajouté avec succés.");
      onClose();
      location.reload();
      router.push("/dashboard?value=hotel");
    } catch (error) {
      setColor("red");
      setToastMessage("Erreur lors de l'ajout de l'hotel:", error);
      console.error("Erreur lors de l'ajout de l'hotel:", error);
    }
  };

  if (!isOpen) return null;
  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <HotelDiv>
        <Top>
          <FaArrowLeft style={{ cursor: "pointer" }} onClick={onClose} />
          &nbsp; créer un nouveau hôtel
        </Top>
        <Form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="form">
              <label>Nom de l'hôtel</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                  validateNom(e.target.value);
                }}
                required
              />
              <Message>
                {nom === "" ? (
                  ""
                ) : errors.nom ? (
                  <ErrorMessage>
                    <ImCross />
                    &nbsp;{errors.nom}
                  </ErrorMessage>
                ) : (
                  <SuccessMessage>
                    <FaCheckCircle />
                  </SuccessMessage>
                )}
              </Message>
            </div>

            <div className="form">
              <label>Adresse</label>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
              <Message></Message>
            </div>
          </div>
          <div className="form-control">
            <div className="form">
              <label>E-mail</label>
              <input
                type="mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              <Message>
                {email === "" ? (
                  ""
                ) : errors.email ? (
                  <ErrorMessage>
                    <ImCross />
                    &nbsp;{errors.email}
                  </ErrorMessage>
                ) : (
                  <SuccessMessage>
                    <FaCheckCircle />
                  </SuccessMessage>
                )}
              </Message>
            </div>

            <div className="form">
              <label>Numéro de téléphone</label>
              <input
                type="text"
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                  validateTel(e.target.value);
                }}
                required
              />
              <Message>
                {tel === "" ? (
                  ""
                ) : errors.tel ? (
                  <ErrorMessage>
                    <ImCross />
                    &nbsp;{errors.tel}
                  </ErrorMessage>
                ) : (
                  <SuccessMessage>
                    <FaCheckCircle />
                  </SuccessMessage>
                )}
              </Message>
            </div>
          </div>
          <div className="form-control">
            <div className="form">
              <label>Prix par nuit</label>
              <input
                type="text"
                value={prix}
                onChange={(e) => {
                  setPrix(e.target.value);
                  validatePrix(e.target.value);
                }}
                required
              />
              <Message>
                {prix === "" ? (
                  ""
                ) : errors.prix ? (
                  <ErrorMessage>
                    <ImCross />
                    &nbsp;{errors.prix}
                  </ErrorMessage>
                ) : (
                  <SuccessMessage>
                    <FaCheckCircle />
                  </SuccessMessage>
                )}
              </Message>
            </div>

            <div className="form">
              <label>Devise</label>
              <select
                value={devise}
                onChange={(e) => setDevise(e.target.value)}
              >
                <option value="XOF" selected>
                  F XOF
                </option>
                <option value="€" selected>
                  Euro
                </option>
                <option value="$" selected>
                  Dollars
                </option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <div className="form">
              <label>Ajouter une photo</label>
              <div className="photo">
                {verif && (
                  <>
                    <FaRegImage />
                    <div className="text">Ajouter une photo</div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="bottom">
            <Button type="submit">Enregistrer</Button>
          </div>
        </Form>
      </HotelDiv>
      {toastMessage && <Toast message={toastMessage} color={color} />}
    </Container>
  );
};

export default Hotel;

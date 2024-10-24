"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { login, signup, signout } from "../services/api";
import { useRouter } from "next/navigation";

const AuthPage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/images/background.jpeg");
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Black = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Top = styled.div`
  font-family: "Roboto", serif;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 700;
  font-size: 26px;
  display: flex;
  justify-content: space-around;
  width: 250px;
  margin-bottom: 30px;

  img {
    width: 32px;
  }
`;

const Bottom = styled.div`
  margin: 20px 0;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    color: white;
  }

  a {
    text-decoration: none;
  }

  span {
    color: rgba(255, 217, 100, 1);
  }
`;
// Styled Components pour le conteneur et les formulaires
const AuthContainer = styled.div`
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 250px;
  text-align: center;
  background-color: white;

  p {
    color: black;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 0;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid rgba(160, 160, 160, 0.2);
    font-size: 16px;
    outline: none;
  }

  .form-control {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .form-control input[type="checkbox"] {
    margin-right: 10px;
    color: rgba(160, 160, 160, 0.2);
  }

  button {
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background: rgba(69, 72, 75, 1);
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const AuthForm = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (type === "connexion") {
      try {
        const result = await login({ email, password });
        console.log(result);
        router.push("/dashboard");
      } catch (error) {
        setEmail("");
        setPassword("");
        setError("Erreur lors de la connexion. Vérifiez vos identifiants.");
      }
    } else if (type === "inscription") {
      try {
        const result = await signup({ nom, email, password });
        router.push("../");
      } catch (error) {
        setNom("");
        setEmail("");
        setPassword("");
        console.log(error);
        setError("Erreur lors de l'inscription'. Vérifiez vos informations.");
      }
    } else {
      console.log("a");
    }
  };

  const renderForm = () => {
    switch (type) {
      case "inscription":
        return (
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">S'inscrire</button>
          </Form>
        );
      case "connexion":
        return (
          <Form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-control">
              <input type="checkbox" id="question" />
              <label htmlFor="question">Gardez-moi connecté</label>
            </div>
            <button type="submit">Se connecter</button>
          </Form>
        );
      case "password":
        return (
          <Form onSubmit={handleSubmit}>
            <input type="email" placeholder="Votre e-mail" required />
            <button type="submit">Envoyer</button>
          </Form>
        );
      default:
        return null;
    }
  };

  const renderBottomMessage = () => {
    switch (type) {
      case "inscription":
        return (
          <p>
            Vous avez déjà un compte?&nbsp;
            <a href="../">
              <span>Se connecter</span>
            </a>
          </p>
        );
      case "connexion":
        return (
          <>
            <p>
              <a href="/authentification/password">
                <span>Mot de passe oublié?</span>
              </a>
            </p>
            <p>
              Vous n'avez pas de compte?&nbsp;
              <a href="/authentification/inscription">
                <span>S'inscrire</span>
              </a>
            </p>
          </>
        );
      case "password":
        return (
          <p>
            Revenir à la&nbsp;
            <a href="../">
              <span>connexion</span>
            </a>
          </p>
        );
      default:
        return null;
    }
  };

  const renderTopMessage = () => {
    switch (type) {
      case "inscription":
        return <p>Inscrivez-vous en tant que Admin</p>;
      case "connexion":
        return <p>Connectez-vous en tant que Admin</p>;
      case "password":
        return (
          <>
            <p>Mot de passe oublié?</p>
            <p>
              Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
              instructions sur la façon de modifier votre mot de passe.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AuthPage>
      <Black>
        <Top>
          <div>
            <img src="/assets/svg/redproduct.png" />
          </div>
          <div>RED PRODUCT</div>
        </Top>

        <AuthContainer>
          {renderTopMessage()}
          {renderForm()}
        </AuthContainer>
        <Bottom>{renderBottomMessage()}</Bottom>
      </Black>
    </AuthPage>
  );
};

export default AuthForm;

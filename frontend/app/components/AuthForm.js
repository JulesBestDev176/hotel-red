"use client";
import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import {
  login,
  signup,
  signout,
  sendResetEmail,
  changePassword,
} from "../services/api";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import Loading from "../loading";

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
  background-color: rgba(0, 5, 10, 0.72);
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
  font-weight: 500;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  width: 160px;
  margin-bottom: 30px;

  img {
    width: 22px;
  }
`;

const Bottom = styled.div`
  margin: 20px 0;

  p {
    font-size: 12px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 400;
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
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 200px;
  max-height: 260px;
  min-height: 100px;
  text-align: center;
  background-color: white;

  p {
    color: black;
    font-weight: 400;
    font-size: 11px;
    text-align: left;
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  font-weight: 400;

  input {
    margin: 10px 0;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid rgba(160, 160, 160, 0.2);
    font-size: 12px;
    outline: none;
    background-color: #fff;
    color: black;
  }

  .form-control {
    display: flex;
    align-items: center;
    margin: 5px 0;
    font-size: 13px;
  }

  .form-control input[type="checkbox"] {
    margin-right: 10px;
    background-color: white;
  }
  .form-control label {
    font-size: 11px;
    color: rgba(0, 0, 0, 0.87);
  }

  button {
    margin-top: 5px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background: rgba(69, 72, 75, 1);
    color: white;
    font-size: 12px;
    cursor: pointer;
  }
`;

const AuthForm = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToastMessage("");
    setIsLoading(true);

    if (type === "connexion") {
      try {
        const result = await login({ email, password });
        console.log(result);
        setColor("green");
        router.push("/dashboard");
      } catch (error) {
        setEmail("");
        setPassword("");
        setToastMessage(
          "Erreur lors de la connexion. Vérifiez vos identifiants."
        );
        setColor("red");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "inscription") {
      try {
        const result = await signup({ nom, email, password });
        setColor("green");
        router.push("../");
      } catch (error) {
        setNom("");
        setEmail("");
        setPassword("");
        console.log(error);
        setToastMessage(
          "Erreur lors de l'inscription. Vérifiez vos informations."
        );
        setColor("red");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "changePassword") {
      const passwords = {
        password1,
        password2,
      };
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      try {
        const result = await changePassword({ passwords }, email);
        setColor("green");
        router.push("../");
      } catch (error) {
        setPassword1("");
        setPassword2("");
        setPassword("");
        console.log(error);
        setToastMessage(
          "Erreur lors de l'inscription. Vérifiez vos informations."
        );
        setColor("red");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "password") {
      try {
        const result = await sendResetEmail({ email: emailReset });

        setColor("green");
        setEmailReset("");
      } catch (error) {
        setEmailReset("");
        setToastMessage(
          "Erreur lors de la modification. Vérifiez vos informations."
        );
        setColor("red");
      } finally {
        setIsLoading(false);
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
            <div className="form-control">
              <input type="checkbox" id="question" />
              <label htmlFor="question">
                Accepter les termes et la politique
              </label>
            </div>
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
      case "changePassword":
        return (
          <Form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button type="submit">Modifier</button>
          </Form>
        );
      case "password":
        return (
          <Form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Votre e-mail"
              value={emailReset}
              onChange={(e) => setEmailReset(e.target.value)}
              required
            />
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

  return isLoading ? (
    <Loading />
  ) : (
    <AuthPage>
      <Suspense fallback={<Loading />}>
        <Black>
          <Top>
            <div>
              <img src="/assets/svg/redproduct.png" />
            </div>
            <div>RED PRODUCT</div>
          </Top>
          <AuthContainer>
            {toastMessage && <Toast message={toastMessage} color={color} />}
            {renderTopMessage()}
            {renderForm()}
          </AuthContainer>
          <Bottom>{renderBottomMessage()}</Bottom>
        </Black>
      </Suspense>
    </AuthPage>
  );
};

export default AuthForm;

"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
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
import {
  AuthPage,
  Black,
  Top,
  Bottom,
  AuthContainer,
  Form,
  Message,
  ErrorMessage,
  SuccessMessage,
} from "./style";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AuthForm = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nom, setNom] = useState("");
  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    password: "",
    password1: "",
    password2: "",
    emailReset: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [color, setColor] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 3000); // Le toast reste visible 3 secondes

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const validateNom = (value) => {
    if (value === "") {
      setErrors((prev) => ({ ...prev, nom: "Le nom ne doit pas être vide." }));
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

  const validateSamePassword = (value1, value2) => {
    if (value2 !== "" && value1 !== value2) {
      setErrors((prev) => ({
        ...prev,
        password2: "Mot de passe non identique",
      }));
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (value === "") {
      setErrors((prev) => ({
        ...prev,
        password: "Le mot de passe ne doit pas être vide",
      }));
    } else if (!passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "majuscule, minuscule, un chiffre, caractère spécial, 8 caractères.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage("");
    setColor("");

    if (type === "connexion") {
      try {
        const result = await login({ email, password });

        setToastMessage("Connexion réussie!");
        setColor("green");

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error) {
        setToastMessage(
          "Erreur lors de la connexion. Vérifiez vos identifiants."
        );
        setColor("red");

        setEmail("");
        setPassword("");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "inscription") {
      try {
        const result = await signup({ nom, email, password });
        setToastMessage("Inscription réussie!");
        setColor("green");
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        setToastMessage(
          "Erreur lors de l'inscription. Vérifiez vos informations."
        );
        setColor("red");
        setNom("");
        setEmail("");
        setPassword("");
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
        setToastMessage("Mot de passe changé avec succés.");
        setColor("green");
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        setToastMessage("Erreur lors de la modification du mot de passe");
        setColor("red");
        setPassword1("");
        setPassword2("");
        setPassword("");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "password") {
      try {
        const result = await sendResetEmail({ email: emailReset });
        setToastMessage("Un lien vous a été envoyé par mail");
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
              onChange={(e) => {
                setNom(e.target.value);
                validateNom(e.target.value);
              }}
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

            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
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
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            <Message>
              {password === "" ? (
                ""
              ) : errors.password ? (
                <ErrorMessage>
                  <ImCross />
                  &nbsp;{errors.password}
                </ErrorMessage>
              ) : (
                <SuccessMessage>
                  <FaCheckCircle />
                </SuccessMessage>
              )}
            </Message>
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
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
                setEmail(e.target.value);
              }}
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
            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => {
                validatePassword(e.target.value);
                setPassword(e.target.value);
              }}
            />
            <Message>
              {password === "" ? (
                ""
              ) : errors.password ? (
                <ErrorMessage>
                  <ImCross />
                  &nbsp;{errors.password}
                </ErrorMessage>
              ) : (
                <SuccessMessage>
                  <FaCheckCircle />
                </SuccessMessage>
              )}
            </Message>
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
              onChange={(e) => {
                setPassword1(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            <Message>
              {password1 === "" ? (
                ""
              ) : errors.password1 ? (
                <ErrorMessage>
                  <ImCross />
                  &nbsp;{errors.password1}
                </ErrorMessage>
              ) : (
                <SuccessMessage>
                  <FaCheckCircle />
                </SuccessMessage>
              )}
            </Message>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              required
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                validatePassword(e.target.value);
                validateSamePassword(e.target.value, password2);
              }}
            />
            <Message>
              {password2 === "" ? (
                ""
              ) : errors.password2 ? (
                <ErrorMessage>
                  <ImCross />
                  &nbsp;{errors.password2}
                </ErrorMessage>
              ) : (
                <SuccessMessage>
                  <FaCheckCircle />
                </SuccessMessage>
              )}
            </Message>

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
              onChange={(e) => {
                setEmailReset(e.target.value);
                validateEmail(e.target.value);
              }}
              required
            />
            <Message>
              {emailReset === "" ? (
                ""
              ) : errors.email ? (
                <ErrorMessage>
                  <ImCross />
                  &nbsp;{errors.email}
                </ErrorMessage>
              ) : errors.email === "" ? (
                ""
              ) : (
                <SuccessMessage>
                  <FaCheckCircle />
                </SuccessMessage>
              )}
            </Message>

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
            <p className="pa">
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
          <Toast message={toastMessage} color={color} show={showToast} />
          {renderTopMessage()}
          {renderForm()}
        </AuthContainer>
        <Bottom>{renderBottomMessage()}</Bottom>
      </Black>
    </AuthPage>
  );
};

export default AuthForm;

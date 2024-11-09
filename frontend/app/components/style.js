import styled from "styled-components";
export const AuthPage = styled.div`
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

export const Black = styled.div`
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

export const Top = styled.div`
  font-family: "Roboto", serif;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  justify-content: space-around;
  width: 260px;
  margin-bottom: 30px;
  line-height: 34px;
  margin-top: 40px;

  img {
    width: 32px;
  }
`;

export const Bottom = styled.div`
  margin: 20px 0;

  p {
    font-size: 20px;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 400;
    color: white;
    margin-top: 10px;
  }

  a {
    text-decoration: none;
  }

  span {
    color: rgba(255, 217, 100, 1);
    font-weight: 600;
  }
`;
// Styled Components pour le conteneur et les formulaires
export const AuthContainer = styled.div`
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 320px;
  /* max-height: 260px; */
  min-height: auto;
  text-align: center;
  background-color: white;

  p {
    color: black;
    font-weight: 300;
    font-size: 20px;
    text-align: left;
    margin-bottom: 15px;
  }
  .pa {
    font-size: 12px;
    line-height: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  font-weight: 400;

  input {
    margin: 10px 0 0 0;
    padding: 10px 0 20px 0px;
    border: none;
    border-bottom: 1px solid rgba(160, 160, 160, 0.2);
    font-size: 15px;
    outline: none;
    background-color: #fff;
    color: #979ea9;
  }

  .form-control {
    display: flex;
    align-items: center;
    margin: 20px 0 15px 0;
    font-size: 18px;
  }

  .form-control input[type="checkbox"] {
    margin-right: 10px;
    background-color: white;
    width: 20px;
    height: 20px;
  }
  .form-control label {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 10px;
  }

  button {
    margin-top: 5px;
    padding: 15px;
    border: none;
    border-radius: 4px;
    background: rgba(69, 72, 75, 1);
    color: white;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const Message = styled.div`
  padding: 0;
  margin-top: 0px;
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

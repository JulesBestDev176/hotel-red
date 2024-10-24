// components/Toast.js
import React from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  padding: 16px;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: fadeIn 0.5s, fadeOut 0.5s 2.5s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  background-color: ${(props) => props.color || "none"};
`;

const Toast = ({ message, color }) => {
  return <ToastContainer color={color}>{message}</ToastContainer>;
};

export default Toast;

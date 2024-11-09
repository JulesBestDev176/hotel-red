import React from "react";
import styled from "styled-components";

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ color }) => color || "green"};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999;
  font-size: 16px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const Toast = ({ message, color, show }) => {
  return (
    <ToastWrapper color={color} show={show}>
      {message}
    </ToastWrapper>
  );
};

export default Toast;

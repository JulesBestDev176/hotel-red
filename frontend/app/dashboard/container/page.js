"use client";
import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/page";
import Main from "../main/page";

const ContainerDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Container = ({ activePage }) => {
  return (
    <ContainerDiv>
      <Navbar activePage={activePage} />
      <Main activePage={activePage} />
    </ContainerDiv>
  );
};

export default Container;

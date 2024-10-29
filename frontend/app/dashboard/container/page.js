"use client";
import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/page";
import Main from "../main/page";
import useHotels from "@/app/services/useHotels";

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
  const { setName, hotels, loading, error } = useHotels();
  return (
    <ContainerDiv>
      <Navbar activePage={activePage} setHotelName={setName} />
      <Main
        activePage={activePage}
        hotels={hotels}
        loading={loading}
        error={error}
      />
    </ContainerDiv>
  );
};

export default Container;

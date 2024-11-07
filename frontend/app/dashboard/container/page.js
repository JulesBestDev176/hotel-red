"use client";
import React, { Suspense } from "react";
import styled from "styled-components";
import Navbar from "../navbar/page";
import Main from "../main/page";
import useHotels from "@/app/services/useHotels";
import Loading from "@/app/loading";

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
      <Suspense fallback={<Loading />}>
        <Navbar activePage={activePage} setHotelName={setName} />
        <Main
          activePage={activePage}
          hotels={hotels}
          loading={loading}
          error={error}
        />
      </Suspense>
    </ContainerDiv>
  );
};

export default Container;

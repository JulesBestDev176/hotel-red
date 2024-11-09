"use client";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./card/page";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { TbLetterP } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { listHotel } from "@/app/services/api";
import Hotel from "./hotel/page";
import useHotels from "@/app/services/useHotels";
import Loading from "@/app/loading";

const MainDiv = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
  /* & > div:nth-child(3n) {
    margin-right: 0;
  } */
  color: black;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    margin-bottom: 120px;
  }
`;

const Main = ({ activePage, hotels, loading, error }) => {
  const cards = [
    {
      logo: <FaEnvelopeOpen />,
      color: "#A88ADD",
      number: "125",
      nom: "Formulaires",
      description: "Je ne sais pas quoi mettre",
    },
    {
      logo: <TbLetterP />,
      color: "#0CC2AA",
      number: "40",
      nom: "Messages",
      description: "Je ne sais pas quoi mettre",
    },
    {
      logo: <FaUserFriends />,
      color: "#FCC100",
      number: "600",
      nom: "Utilisateurs",
      description: "Je ne sais pas quoi mettre",
    },
    {
      logo: <FaEnvelopeOpen />,
      color: "#F90000",
      number: "25",
      nom: "E-mails",
      description: "Je ne sais pas quoi mettre",
    },
    {
      logo: <TbLetterP />,
      color: "#9C27B0",
      number: "40",
      nom: "Hôtels",
      description: "Je ne sais pas quoi mettre",
    },
    {
      logo: <FaUserFriends />,
      color: "#1565C0",
      number: "02",
      nom: "Entités",
      description: "Je ne sais pas quoi mettre",
    },
  ];

  return (
    <MainDiv>
      <Suspense fallback={<Loading />}>
        {activePage === "dashboard" ? (
          cards.map((c, index) => <Card key={index} card={c} />)
        ) : loading ? (
          <Loading />
        ) : hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => <Hotel key={index} hotel={hotel} />)
        ) : (
          <p>Aucun hôtel trouvé.</p>
        )}
      </Suspense>
    </MainDiv>
  );
};

export default Main;

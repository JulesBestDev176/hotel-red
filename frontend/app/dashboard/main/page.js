"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./card/page";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { TbLetterP } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { listHotel } from "@/app/services/api";
import Hotel from "./hotel/page";
import useHotels from "@/app/services/useHotels";

const MainDiv = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
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
      {activePage === "dashboard" ? (
        cards.map((c, index) => <Card key={index} card={c} />)
      ) : loading ? (
        <p>Chargement des hôtels...</p>
      ) : hotels && hotels.length > 0 ? (
        hotels.map((hotel, index) => <Hotel key={index} hotel={hotel} />)
      ) : (
        <p>Aucun hôtel trouvé.</p>
      )}
    </MainDiv>
  );
};

export default Main;

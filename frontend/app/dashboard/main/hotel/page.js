"use client";
import React, { useEffect } from "react";
import styled from "styled-components";

const HotelDiv = styled.div`
  width: 246px;
  margin-bottom: 20px;
  margin-right: 20px;
  height: 260px;
  background-color: white;
  border: none;
  border-radius: 12px;
  display: flex;

  display: flex;
  flex-direction: column;
  &:last-child {
    margin-right: 0;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 65%;
  img {
    width: 100%;
    border-radius: 12px 12px 0 0;
    height: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  .adresse {
    color: rgba(141, 75, 56, 1);
    font-size: 11px;
  }

  .nom {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .prix {
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

const Hotel = ({ hotel }) => {
  if (!hotel) {
    return <div>Chargement...</div>; // État de chargement ou message approprié
  }

  // const imageUrl = `https://hotel-red.onrender.com/assets/images/hotel/${hotel.image}`;

  return (
    <HotelDiv>
      <Image>
        <img src={hotel.image} alt={hotel.nom} />
      </Image>
      <Info>
        <div className="adresse">{hotel.adresse}</div>
        <div className="nom">{hotel.nom}</div>
        <div className="prix">
          {hotel.prix} {hotel.devise} par nuit
        </div>
      </Info>
    </HotelDiv>
  );
};

export default Hotel;

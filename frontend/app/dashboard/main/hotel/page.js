"use client";
import React from "react";
import styled from "styled-components";

const HotelDiv = styled.div`
  width: calc(30% - 20px);
  margin-bottom: 20px;
  height: 300px;
  background-color: white;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: flex;

  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  width: 100%;
  height: 75%;
  img {
    width: 100%;
    border-radius: 6px 6px 0 0;
    height: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  .adresse {
    color: rgba(141, 75, 56, 1);
    font-size: 12px;
    margin-bottom: 5px;
  }

  .nom {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .prix {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 10px;
  }
`;

const Hotel = ({ hotel }) => {
  if (!hotel) {
    return <div>Chargement...</div>; // État de chargement ou message approprié
  }
  return (
    <HotelDiv>
      <Image>
        <img src={`/assets/images/hotel/${hotel.image}`} alt={hotel.nom} />
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

"use client";
import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  width: calc(33.33% - 40px);
  margin-bottom: 20px;
  height: 100px;
  background-color: white;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 10px;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
`;

const Cercle = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.$backgroundColor || "#BF4F74"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-size: 20px;
  font-weight: 500;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding: 0;
  margin-bottom: 5px;
`;

const Nom = styled.div``;

const Number = styled.div`
  span {
    font-size: 20px;
    font-weight: 500;
  }
`;

const Card = ({ card }) => {
  if (!card) return null;
  return (
    <CardDiv>
      <Left>
        <Cercle $backgroundColor={card.color}>{card.logo}</Cercle>
      </Left>
      <Right>
        <Line>
          <Number>
            <span>{card.number} </span>
            {card.nom}
          </Number>
        </Line>
        <Line>{card.description}</Line>
      </Right>
    </CardDiv>
  );
};

export default Card;

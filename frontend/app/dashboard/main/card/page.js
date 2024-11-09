"use client";
import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  width: 335px;
  margin-bottom: 30px;
  margin-right: 20px;
  height: 70px;
  background-color: white;
  border: none;
  border-radius: 12px;
  display: flex;
  @media (max-width: 768px) {
    width: 220px;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 75%;
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
  font-size: 18px;
  font-weight: 700;
`;

const Line = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 300;
  padding: 0;
  margin-bottom: 0px;

  .description {
    font-weight: 400;
  }
`;

const Nom = styled.div``;

const Number = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;

  span {
    font-size: 20px;
    font-weight: 400;
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
        <Line className="description">{card.description}</Line>
      </Right>
    </CardDiv>
  );
};

export default Card;

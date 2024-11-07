"use client";
import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  width: 300px;
  margin-bottom: 30px;
  margin-right: 20px;
  height: 70px;
  background-color: white;
  border: none;
  border-radius: 12px;
  display: flex;
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
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$backgroundColor || "#BF4F74"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
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
  font-size: 11px;
  span {
    font-size: 20px;
    font-weight: 300;
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

"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { TbDeviceDesktopDown } from "react-icons/tb";
import { FaCircle } from "react-icons/fa6";

const SidebarDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/assets/images/background.jpeg");
  background-size: cover;
  background-position: center;
  margin: 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const Black = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 5, 10, 0.72);
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 500;
  padding: 10px 15px;
  @media (max-width: 768px) {
    justify-content: center;
    display: none;
  }

  div {
    display: flex;

    img {
      width: 24px;
      margin-right: 15px;
    }
  }
  .redProduct {
    font-size: 20px;
  }
`;

const Principale = styled.div`
  color: rgba(255, 255, 255, 0.87);
  font-weight: 500;
  font-size: 15px;
  display: flex;
  padding: 15px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Line = styled.div`
  background: ${(props) => (props.$primary ? "#F0F0F0" : "none")};
  padding: 10px 15px;
  color: ${(props) =>
    props.$primary ? "#55595C" : "rgba(255, 255, 255, 0.87)"};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    padding: 0;
  }

  .text {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .icone {
    margin-right: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    @media (max-width: 768px) {
      justify-content: center;
      font-size: 40px;
      transform: translateX(25%);
    }
  }

  .image {
    width: 20%;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .droite {
    display: flex;
    flex-direction: column;
  }

  .statut {
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
  }

  .online {
    margin-right: 10px;
    color: rgba(0, 255, 146, 1);
    display: flex;
    align-items: center;
  }

  .nom {
    font-size: 14px;
    font-weight: 400;
  }

  img {
    border-radius: 100%;
    width: 100%;
  }
`;

const Bottom = styled.div`
  height: 10%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 90%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ activePage, setActivePage, user }) => {
  return (
    <SidebarDiv>
      <Black>
        <Top>
          <Logo>
            <div>
              <img src="/assets/svg/redproduct.png" alt="red product" />
            </div>
            <div className="redProduct">RED PRODUCT</div>
          </Logo>
          <Principale>Principale</Principale>
          <List>
            <StyledLink href="#">
              <Line
                $primary={activePage === "dashboard"}
                onClick={() => setActivePage("dashboard")}
              >
                <div className="icone">
                  <MdDashboard />
                </div>
                <div className="text">Dashboard</div>
              </Line>
            </StyledLink>
            <StyledLink href="#">
              <Line
                $primary={activePage === "hotels"}
                onClick={() => setActivePage("hotels")}
              >
                <div className="icone">
                  <TbDeviceDesktopDown />
                </div>
                <div className="text">Liste des hotels</div>
              </Line>
            </StyledLink>
          </List>
        </Top>

        <Bottom>
          <Line>
            <div className="image">
              <img src="/assets/images/user.jpg" alt="user" />
            </div>
            <div className="droite">
              <div className="nom">
                {user ? user.nom : "Nom non disponible"}
              </div>
              <div className="statut">
                <div className="online">
                  <FaCircle />
                </div>
                <div>en ligne</div>
              </div>
            </div>
          </Line>
        </Bottom>
      </Black>
    </SidebarDiv>
  );
};

export default Sidebar;

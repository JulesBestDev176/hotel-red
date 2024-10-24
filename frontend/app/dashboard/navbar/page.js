"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { listHotel, signout } from "@/app/services/api";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Hotel from "../hotel/page";

const NavbarDiv = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  align-items: ${(props) => (props.$primary ? "center" : "left")};
  flex-direction: ${(props) => (props.$primary ? "row" : "column")};
  border-bottom: ${(props) => (props.$primary ? "1px solid #ccc" : "none")};
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 45%;

  .notif {
    position: relative;
  }

  .notification {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-40%) translateX(70%);
    width: 20px;
    height: 20px;
    border-radius: 30%;
    background-color: #fcc100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const Titre = styled.div`
  font-size: ${(props) => (props.$primary ? "16px" : "20px")};
  font-weight: ${(props) => (props.$primary ? "500" : "300")};
`;

const Paragraphe = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #55595c;
  border-radius: 32px;
  padding: 5px;
  background-color: white;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 2px;
    border-radius: 50px;
    font-size: 16px;
    color: #55595c;

    &::placeholder {
      color: #aaa;
    }
  }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 16px;
  font-weight: 300;
  margin-right: 10px;
  color: #55595c;
`;

const NotificationIcon = styled(IoIosNotificationsOutline)`
  font-size: 30px;
`;

const LogoutIcon = styled(LuLogOut)`
  font-size: 30px;
  cursor: pointer;
`;

const User = styled.div`
  position: relative;
  img {
    border-radius: 100%;
    width: 30px;
  }

  .online {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 3px solid white;
    background-color: #00ff92;
    border-radius: 100%;
    bottom: 0;
    right: 0;
    transform: translateX(30%) translateY(10%);
  }
`;

const HotelNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Ajout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 7px;
  border-radius: 6px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
  }
`;

const Navbar = ({ activePage }) => {
  const router = useRouter();
  const [hotel, setHotel] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await listHotel();
        setHotel(hotelData.data.length);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleLogout = async () => {
    try {
      await signout();
      router.push("../../");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <NavbarDiv>
      <Top $primary={true}>
        <Titre $primary={true}>
          {activePage === "dashboard" ? "Dashboard" : "Liste des hôtels"}
        </Titre>
        <Menu>
          <Form>
            <SearchIcon />
            <input type="text" placeholder="Recherher..." />
          </Form>
          <div className="notif">
            <NotificationIcon />
            <div className="notification">3</div>
          </div>
          <User>
            <img src="/assets/images/user.jpg" alt="user" />
            <div className="online"></div>
          </User>
          <div>
            <LogoutIcon onClick={handleLogout} />
          </div>
        </Menu>
      </Top>
      <Top>
        {activePage === "dashboard" ? (
          <>
            <Titre>Bienvenue sur RED Product</Titre>
            <Paragraphe>Lorem ipsum dolor sit amet consectetur</Paragraphe>
          </>
        ) : (
          <HotelNav>
            <Titre>Hôtels {hotel}</Titre>
            <Ajout onClick={openModal}>
              <div>
                <FaPlus />
                &nbsp; &nbsp; Créer un nouveau hôtel
              </div>
            </Ajout>
          </HotelNav>
        )}
      </Top>

      <Hotel isOpen={isModalOpen} onClose={closeModal} />
    </NavbarDiv>
  );
};

export default Navbar;

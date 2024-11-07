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
import { GoPlus } from "react-icons/go";

const NavbarDiv = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  color: black;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  align-items: ${(props) => (props.$primary ? "center" : "left")};
  flex-direction: ${(props) => (props.$primary ? "row" : "column")};
  border-bottom: ${(props) => (props.$primary ? "1px solid #ccc" : "none")};
  .bottom {
    padding: 10px 0;
    height: 35px;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 32%;
  padding: 5px;

  .search {
    width: 180px;
    height: 15px;
    color: #ccc;
  }
  input {
    color: #ccc;
  }

  .notif {
    position: relative;
  }

  .notification {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(60%);
    width: 10px;
    height: 10px;
    border-radius: 30%;
    background-color: #fcc100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 11px;
    font-weight: 300;
  }
`;

const Titre = styled.div`
  font-size: ${(props) => (props.$primary ? "18px" : "20px")};
  font-weight: ${(props) => (props.$primary ? "500" : "300")};
  color: black;
  span {
    color: #ccc;
  }
`;

const StyledPlus = styled(GoPlus)`
  font-size: 16px;
`;

const Paragraphe = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #55595c;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #78828c21;
  border-radius: 32px;
  padding: 5px;
  background-color: white;
  width: 150px;
  color: #55595c;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0;
    border-radius: 50px;
    font-size: 11px;
    color: #ccc;
    background-color: white;

    &::placeholder {
      color: #ccc;
    }
  }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 16px;
  font-weight: 300;
  margin: 0 10px;
  color: #ccc;
`;

const NotificationIcon = styled(IoIosNotificationsOutline)`
  font-size: 16px;
  cursor: pointer;
`;

const LogoutIcon = styled(LuLogOut)`
  font-size: 16px;
  cursor: pointer;
`;

const User = styled.div`
  position: relative;
  img {
    border-radius: 100%;
    width: 25px;
  }

  .online {
    position: absolute;
    width: 7px;
    height: 7px;
    border: 2px solid white;
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
  padding: 10px 0;
  height: 35px;
`;

const Ajout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 300;
    color: black;
  }
`;

const Navbar = ({ activePage, setHotelName }) => {
  const router = useRouter();

  const [hotel, setHotel] = useState(0);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signout();
      router.push("../../");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };
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

  const handleChange = (e) => {
    setName(e.target.value); // Met à jour l’état `name` localement
    setHotelName(e.target.value); // Met à jour le nom dans `useHotels`
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
          <Form className="search">
            <SearchIcon />
            <input
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="Recherher..."
            />
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
          <div className="bottom">
            <Titre>Bienvenue sur RED Product</Titre>
            <Paragraphe>Lorem ipsum dolor sit amet consectetur</Paragraphe>
          </div>
        ) : (
          <HotelNav>
            <Titre className="titre">
              Hôtels&nbsp; &nbsp; <span>{hotel}</span>
            </Titre>
            <Ajout onClick={openModal}>
              <div>
                <StyledPlus />
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

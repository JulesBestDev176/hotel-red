"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/page";
import Container from "./container/page";
import styled from "styled-components";
import { getUserConnected } from "@/app/services/api";
import useAuth from "@/hook/useAuth";

const DashboardDiv = styled.div`
  width: 100vw;
  display: flex;
`;

const Gauche = styled.div`
  width: 25%; /* Set width to 25% */
  margin: 0;
`;

const Droite = styled.div`
  width: 75%;
  margin: 0;
`;

const Dashboard = ({ page }) => {
  const isAuthenticated = useAuth();

  const [activePage, setActivePage] = useState(page ? page : "dashboard");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserConnected();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur : ",
          error
        );
      }
    };

    fetchUser();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <DashboardDiv>
      <Gauche>
        <Sidebar
          user={user}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </Gauche>
      <Droite>
        <Container user={user} activePage={activePage} />
      </Droite>
    </DashboardDiv>
  );
};

export default Dashboard;

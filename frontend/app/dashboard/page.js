"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/page";
import Container from "./container/page";
import styled from "styled-components";
import { getUserConnected } from "@/app/services/api";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { Suspense } from "react";

const DashboardDiv = styled.div`
  width: 100vw;
  display: flex;
  margin: 0;
`;

const Gauche = styled.div`
  width: 19%; /* Set width to 25% */
`;

const Droite = styled.div`
  width: 81%;
`;

const Dashboard = ({ page }) => {
  const [activePage, setActivePage] = useState(page ? page : "dashboard");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirection si aucun token n'est présent

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
        router.push(""); // Redirige si une erreur survient lors de la récupération
      } finally {
        setIsLoading(false); // Terminé, permet le rendu
      }
    };

    fetchUser();
    if (!token) {
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <DashboardDiv>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </DashboardDiv>
  );
};

export default Dashboard;

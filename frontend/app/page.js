"use client";
import { Suspense } from "react";
import AuthForm from "./components/AuthForm";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm type="connexion" />
    </Suspense>
  );
}

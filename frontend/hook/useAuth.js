import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const isAuthenticated =
    typeof window !== "undefined" && localStorage.getItem("authToken"); // Vérifiez le token

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useAuth;

import HomeScreen from "@/screens/home/home.screen";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await SecureStore.getItemAsync("user");
      if (data) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <></>;
  }

  return isAuthenticated ? <HomeScreen /> : <Redirect href="/login" />;
}
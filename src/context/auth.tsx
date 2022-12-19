import { createContext, useEffect, useState } from "react";
import useNetworkStatus from "../hooks/useNetworkStatus";
import User from "../interface/user";
import userService from "../service/userService";

interface AuthDetails {
  user: User | null;
  token: string | null;
  fetchingUser: boolean;
  saveToken: (token: string) => void;
  logoutUser: () => void;
  refreshUser: () => void;
}

interface AuthContextProp {
  children: JSX.Element;
}

const ls: Storage | null = typeof window !== "undefined" ? localStorage : null;
const token: string | null = ls?.getItem("x-auth-token") || null;
export const AuthContext = createContext({} as AuthDetails);

export const AuthContextProvider = ({ children }: AuthContextProp) => {
  const { isConnected } = useNetworkStatus();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!token) return;
    getUserDetails();
  }, [token, isConnected, refresh]);

  function saveToken(token: string) {
    ls?.setItem("x-auth-token", token);
  }

  function logoutUser() {
    ls?.clear();
    window.location.replace("/");
  }

  async function getUserDetails() {
    try {
      setLoading(true);
      const { data } = await userService.getUser();
      setUser(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        fetchingUser: loading,
        saveToken,
        logoutUser,
        refreshUser: () => setRefresh((prev) => !prev),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

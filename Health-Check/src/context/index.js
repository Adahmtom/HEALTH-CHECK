import { createContext, useEffect, useState } from "react";
import { queryKeys } from "../react-query/constants";
import { getLoginToken, getStoredUser, setStoredUser } from "../storage";
import { getDecodedJWT, isAuthenticated } from "../utils";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext({
  user: "",
  email: "",
  token: "",
  role: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const data = getLoginToken();
    if (data) {
      setAuthToken(data);
    }
  }, []);

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      setUser(data);
    }
  }, []);

  function logout() {
    setUser(undefined);
    setAuthToken(undefined);
    localStorage.clear();
    queryClient.invalidateQueries([queryKeys.user]);
  }

  function authenticate(data) {
    setAuthToken(data);
    const decoded = getDecodedJWT(data);
    setUser(decoded);
    setStoredUser(decoded);
  }

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

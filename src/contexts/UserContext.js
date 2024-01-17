import { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "axios";
import { axiosRequest, axiosResponse } from "../api/axiosDefault";
import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const UserContext = createContext();
export const SetUserContext = createContext();

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(SetUserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get("dj-rest-auth/user/");
        setUser(data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  useMemo(() => {
    axiosRequest.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("dj-rest-auth/token/refresh/");
          } catch (error) {
            setUser((prevUser) => {
              if (prevUser) history.push("/signin");
              return null;
            });
            removeTokenTimestamp()
            return config;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    axiosResponse.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setUser((prevUser) => {
              if (prevUser) history.push("/signin");
              return null;
            });
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
  }, [history]);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

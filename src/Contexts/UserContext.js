import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();
export const SetUserContext = createContext();

export const useUser = () => useContext(UserContext); 
export const useSetUser = () => useContext(SetUserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("dj-rest-auth/user/");
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

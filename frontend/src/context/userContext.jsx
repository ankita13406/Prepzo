// import React, { createContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // track loading state

//   useEffect(() => {
//     if (user) return;

//     const accessToken = localStorage.getItem("token");
//     if (!accessToken) {
//       setLoading(false);
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
//         setUser(response.data);
//       } catch (error) {
//         console.error("User not authenticated", error);
//         clearUser();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Save user + token
//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("token", userData.token); // store token
//     setLoading(false);
//   };

//   // Clear user + remove token
//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;




import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user whenever token changes
  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // ✅ This runs once on mount — enough if your header listens to user state

  // Update user & token
  const updateUser = (userData) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  // Clear user & token
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

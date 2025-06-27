import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        const parsedToken = token ? JSON.parse(token) : undefined;
        if (parsedToken) {
          const { data } = await axios.get(
            "http://localhost:4001/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.log("Error while fetching blog", error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
      }
    };
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

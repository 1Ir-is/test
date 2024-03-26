import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { UserProfile, UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { editUserAPI } from "../Services/UserService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  editUser: (formData: FormData) => void; // Added editUser function
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ) => {
    await registerAPI(email, name, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj: UserProfile = {
            userId: res?.data.userId, // Add userId property
            name: res?.data.name,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Register Success!");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj: UserProfile = {
            userId: res?.data.userId, // Make sure userId is correctly set
            name: res?.data.name,
            email: res?.data.email,
            // Other properties...
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/home");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };
  
  

  const editUser = async (formData: FormData) => {
    try {
      const res = await editUserAPI(formData);
      if (res) {
        // Update local user state with the edited information
        const editedUserData: UserProfile = {
          userId: user?.userId,
          name: formData.get('name') as string,
          email: user?.email,
          phone: formData.get('phone') as string, // Update phone
          address: formData.get('address') as string, // Update address
          // Include other properties as necessary
        };
        
        setUser(editedUserData);
        
        // Update user information in local storage
        const updatedUser = {
          ...user,
          name: formData.get('name') as string,
          phone: formData.get('phone') as string, // Update phone
          address: formData.get('address') as string, // Update address
          // Update other properties as necessary
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        // Handle success
        toast.success("User information updated successfully!");
      }
    } catch (error) {
      // Handle error
      toast.warning("Server error occurred");
    }
  };
  



  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser, editUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);

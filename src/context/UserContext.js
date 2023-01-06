import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// @function  UserContext
const UserContext = createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {

  const [user, setUser] = useState({ email: '', auth: false });

  const navigate = useNavigate();

  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    navigate('/');
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser((user) => ({
      email: '',
      auth: false,
    }));
    navigate('/')
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};

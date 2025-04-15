import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USER_KEY = 'user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem(USER_KEY); // Clear corrupted data
      }
    }
  }, []);

  // Login function
  const loginUser = (userData, token) => {
    const fullUser = { ...userData, token };
    setUser(fullUser);
    localStorage.setItem(USER_KEY, JSON.stringify(fullUser)); // Save user with token

    // Optionally, you could also store the token separately if needed
    // localStorage.setItem('token', token);
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY); // Remove the user object
    // localStorage.removeItem('token'); // No need for this if token is stored in the user object
  };

  // Optional: Token getter, in case you need to access it directly
  const getToken = () => user?.token;

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

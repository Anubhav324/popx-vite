import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Store registered accounts: { email -> { password, ...userData } }
  const [accounts, setAccounts] = useState({});

  const register = (data, password) => {
    setAccounts((prev) => ({
      ...prev,
      [data.email.toLowerCase()]: { ...data, password },
    }));
    setUser(data);
  };

  // Returns null on success, or an error string on failure
  const login = (email, password) => {
    const account = accounts[email.toLowerCase()];
    if (!account) return "No account found with this email.";
    if (account.password !== password) return "Incorrect password.";
    setUser(account);
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

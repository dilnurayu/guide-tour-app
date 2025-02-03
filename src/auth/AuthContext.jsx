import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initially, no user is logged in.
  // After login, user might be: { role: "guide", name: "Guide User" } or { role: "tourist", name: "Tourist User" }
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

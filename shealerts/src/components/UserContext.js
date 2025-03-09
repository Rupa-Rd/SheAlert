import React, { createContext, useState } from 'react';

// Create a context with default values
const defaultUserDetails = {
  fullName: '',
  mobileNumber: '',
  password: '',
  emergencyContact1: { name: '', mobileNumber: '' },
  emergencyContact2: { name: '', mobileNumber: '' },
};

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(defaultUserDetails);

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

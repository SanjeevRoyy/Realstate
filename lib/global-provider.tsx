import React, { createContext, useContext, ReactNode } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
    //@ts-ignore
      value={{        isLogged,        user,        loading,        refetch,      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;

import { createContext, ReactNode, useContext } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode; //the children property has type ReactNode
};

const ShoppingCartContext = createContext({});

// custom hook
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

// function to implement provider
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

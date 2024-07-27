import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode; //the children property has type ReactNode
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// custom hook
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

// function to implement provider
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      // if item does not exist in the cart
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        // find the item in the cart and increase its quantity
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }; //modify the quantity of the item of given id
          } else return item; //return other items as it is
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item;
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

/* eslint-disable max-lines-per-function */
import { collection, getDocs } from 'firebase/firestore';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Product } from '@/api/products/types';
import { db } from '@/libs/firebase';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  updateCartItemQuantity: (id: string, qty: number) => void;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  //
  products: Product[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  console.log({ isLoading, error, isOpen });

  useEffect(() => {
    const collectionRef = collection(db, 'products');
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getDocs(collectionRef);
        const result = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(result as Product[]);
      } catch (err) {
        console.log(err);
        setError('Error fetching data!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //   "shopping-cart",
  //   []
  // )
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  function updateCartItemQuantity(id: string, newQuantity: number) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists in the cart, update its quantity
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
      } else {
        // If the item does not exist in the cart, create a new item
        return [...currItems, { id, quantity: newQuantity }];
      }
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        updateCartItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        products,
      }}
    >
      {children}
      {/* <ShoppingCart isOpen={isOpen} /> */}
    </ShoppingCartContext.Provider>
  );
}

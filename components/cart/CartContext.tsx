import React, { useReducer, createContext, useContext, PropsWithChildren } from 'react';
import isServer from '@utils/isServer';
const { v4: uuidv4 } = require('uuid');

export type CartLineItem = {
    id: string;
    productId: string;
    variantId?: string;
    quantity: number;

    name?: string;
    price?: string;
    totalPrice?: string;
    custom?: { [key: string]: any };
};

export type CartState = {
    lineItems: CartLineItem[];
};

export type AddToCartData = {
    productId: string;
    variantId?: string;
    custom?: { [key: string]: any };
};

export type CartActions = {
    addToCart: (params: AddToCartData) => void;
};

const CartContext = createContext<(CartState & CartActions) | null>(null);

type Action =
    | {
          type: 'ADD_TO_CART';
          data: AddToCartData;
      }
    | {
          type: 'REMOVE_FROM_CART';
          lineItemId: string;
      }
    | {
          type: 'UPDATE_QUANTITY';
          lineItemId: string;
          quantity: number;
      };

const LOCAL_STORAGE_KEY = 'cartState';
const DEFAULT_STATE = {
    lineItems: [],
};

interface Props extends PropsWithChildren {}

const WithCart = ({ children }: Props) => {
    const loadState = (): CartState | undefined => {
        try {
            const stickyValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return stickyValue !== null ? JSON.parse(stickyValue) : DEFAULT_STATE;
        } catch (err) {}
    };

    const saveState = (state: CartState) => {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        } catch (err) {
            // ignore
        }
    };

    const initialState = loadState();

    const [state, dispatch] = useReducer((state: CartState, action: Action) => {
        switch (action.type) {
            case 'ADD_TO_CART':
                state.lineItems = [
                    ...state.lineItems,
                    {
                        id: uuidv4(),
                        quantity: 1,
                        ...action.data,
                    },
                ];
                saveState(state);
                break;
        }
        return state;
    }, initialState || DEFAULT_STATE);

    const actions: CartActions = {
        addToCart: (data) => dispatch({ type: 'ADD_TO_CART', data }),
    };

    if (isServer()) {
        return <>{children}</>;
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                ...actions,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useCart(): (CartState & CartActions) | null {
    return useContext(CartContext) as CartState & CartActions;
}

export default WithCart;

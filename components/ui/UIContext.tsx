import React, { useContext, createContext, useReducer, PropsWithChildren } from 'react';

export type ModalType = 'NONE' | 'ACCOUNT' | 'LOCALE';

export interface State {
    currentModal: ModalType;
    navigationToggle: boolean;
}

export interface Operations {
    openModal(modal: ModalType): void;
    closeModal(): void;
    toggleNavigation(navigationToggle: boolean): void;
}

type Action =
    | {
          type: 'OPEN_MODAL';
          modal: ModalType;
      }
    | {
          type: 'CLOSE_MODAL';
      }
    | {
          type: 'TOGGLE_NAVIGATION';
          value: boolean;
      };

const Context = createContext<(State & Operations) | null>(null);

interface ProviderProps extends PropsWithChildren {}

const Provider = (props: ProviderProps) => {
    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'OPEN_MODAL':
                return {
                    ...state,
                    currentModal: action.modal,
                };
            case 'CLOSE_MODAL':
                return {
                    ...state,
                    currentModal: 'NONE',
                };
            case 'TOGGLE_NAVIGATION':
                return {
                    ...state,
                    navigationToggle: action.value,
                };
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        currentModal: 'NONE',
        navigationToggle: false,
    });

    const value = {
        ...state,
        toggleNavigation: (toggle: boolean) => dispatch({ type: 'TOGGLE_NAVIGATION', value: !toggle }),
        openModal: (modal: ModalType) => dispatch({ type: 'OPEN_MODAL', modal }),
        closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const useUI = (): State & Operations => {
    return useContext(Context) as State & Operations;
};

export const WithUIContext = ({ children }: ProviderProps) => {
    return <Provider>{children}</Provider>;
};

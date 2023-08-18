import React, { useMemo, useReducer } from 'react';

export type DropdownDispatchAction = 'OPEN' | 'CLOSE';

export type DropdownDispatchPayload = {
  x: number,
  y: number,
};

export type DropdownDispatch = React.Dispatch<{
  type: DropdownDispatchAction,
  payload?: DropdownDispatchPayload,
}>;

export interface DropdownContextState {
  isOpen: boolean,
  coords: {
    x: number,
    y: number,
  },
  dispatch: DropdownDispatch,
}

const initialState: DropdownContextState = {
  isOpen: false,
  coords: {
    x: 0,
    y: 0,
  },
  dispatch: () => { },
};

export const DropdownContext = React.createContext<DropdownContextState>(initialState);

function reducer(state: DropdownContextState, action: any) {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
        coords: action.payload,
      };
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export interface DropdownProviderProps {
  children: React.ReactNode,
}

export default function DropdownProvider(props: DropdownProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

import React, { useReducer, createContext } from "react";

export const AppContext = createContext();

const initialState = {
  hoverItem: {
    className: null
  },
  connection: {
    token: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HOVER_ITEM":
      return {
        ...state,
        hoverItem: {
            className: action.payload.className
        }
      };
    case "RESET_HOVER_ITEM":
    return {
      ...state,
      hoverItem: {
        className: null
      }
    };
    case "STORE_CONNECTION_TOKEN":
    return {
      ...state,
      connection: {
        token: action.payload.token
      }
    }

    default:
      throw new Error();
  }
};

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

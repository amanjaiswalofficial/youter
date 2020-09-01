import React, { useReducer, createContext } from "react";

export const AppContext = createContext();

const initialState = {
  hoverItem: {
    className: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HOVER_ITEM":
      return {
        hoverItem: {
            className: action.payload.className
        }
      };
    case "RESET_HOVER_ITEM":
    return {
      hoverItem: {
        className: null
      }
    };
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

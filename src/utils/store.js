import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "./useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
} from "use-reducer-with-side-effects";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_SETTING) {
    const {
      payload: { weight, colorList },
    } = action;

    return UpdateWithSideEffect(
      {
        ...prevState,
        weight,
        colorList,
      },
      (state, dispatch) => {
        setStorageItem("weight", weight);
        setStorageItem("colorList", colorList);
      }
    );
  } else if (type === SET_CALC) {
    const {
      payload: { min, max, unit },
    } = action;

    return UpdateWithSideEffect(
      {
        ...prevState,
        min,
        max,
        unit,
      },
      (state, dispatch) => {
        setStorageItem("min", min);
        setStorageItem("max", max);
        setStorageItem("unit", unit);
      }
    );
  }

  return prevState;
};

export const AppProvider = ({ children }) => {
  const defaultWeight = getStorageItem("weight", 2);
  const defaultColorList = getStorageItem(
    "colorList",
    "노반,초반,파반,남반,보반"
  );
  const defaultMin = getStorageItem("min", 8000);
  const defaultMax = getStorageItem("max", 10000);
  const defaultUnit = getStorageItem("unit", 50);
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    weight: defaultWeight,
    colorList: defaultColorList,
    min: defaultMin,
    max: defaultMax,
    unit: defaultUnit,
  });

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

//Actions
const SET_SETTING = "APP/SET_SETTING";
const SET_CALC = "APP/SET_CALC";

export const setSetting = (weight, colorList) => ({
  type: SET_SETTING,
  payload: { weight, colorList },
});

export const setCalc = (min, max, unit) => ({
  type: SET_CALC,
  payload: { min, max, unit },
});

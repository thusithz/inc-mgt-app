import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { reducer, defaultState, Actions, IAppState } from './reducer/appReducer';
import { StateType } from './type/appType';

type DContextType = {
  dispatch?: (val: object) => void;
};

const AppContext = createContext<StateType>({});
const DispatchAppContext = createContext<DContextType>({});

type AppContextWrapperProps = PropsWithChildren<{ initialState?: Partial<IAppState> }>;

export const AppContextWrapper: React.FC<AppContextWrapperProps> = ({ children, initialState: iState }) => {
  const [state, dispatch] = useReducer(reducer, cloneDeep({ ...defaultState, ...iState }));
  return (
    <DispatchAppContext.Provider value={{ dispatch }}>
      <AppContext.Provider value={state}>{children}</AppContext.Provider>
    </DispatchAppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

export function useDispatchAppContext() {
  return useContext(DispatchAppContext);
}

export { Actions };

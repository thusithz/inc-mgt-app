import { StateType } from '@utils/context/type/appType';

export enum Actions {
  ADD_LOADER = 'ADD_LOADER',
  REMOVE_LOADER = 'REMOVE_LOADER',
  RESET_ALL = 'RESET_ALL',
}

export type Action =
  | {
      type: Actions.ADD_LOADER;
      payload: string;
    }
  | {
      type: Actions.REMOVE_LOADER;
      payload: string;
    }
  | {
      type: Actions.RESET_ALL;
    };

export interface IAppState {
  data: object;
  loaderIds: string[];
}

export const defaultState: IAppState = {
  data: {},
  loaderIds: [],
};

export const reducer = (state: StateType, action: Action): object => {
  const { type } = action;

  switch (type) {
    case Actions.ADD_LOADER: {
      const { payload } = action;
      const { loaderIds } = state;
      if (!loaderIds.includes(payload)) {
        loaderIds.push(payload);
      }
      return { ...state, loaderIds };
    }
    case Actions.REMOVE_LOADER: {
      const { payload } = action;
      const { loaderIds } = state;
      return { ...state, loaderIds: loaderIds.filter((id) => id !== payload) };
    }
    case Actions.RESET_ALL:
    default:
      return defaultState;
  }
};

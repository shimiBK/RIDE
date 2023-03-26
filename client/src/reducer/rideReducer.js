import { ACTION_TYPES } from "./rideActionTypes";

export const INITIAL_STATE = {
  loading: false,
  rides:  [],
  error: false,
};


export const rideReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        error: false,
        rides: [],
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        rides: action.payload,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        error: true,
        loading: false,
        rides:  [],
      };
      case ACTION_TYPES.DELETE_START:
        return {
          error: false,
          loading: true,
          rides: state,
        };
      case ACTION_TYPES.DELETE_SUCCESS:
        return {
          error: false,
          loading: false,
          rides:  [state].filter((x) => x.id !== action.id),
          };
      case ACTION_TYPES.DELETE_ERROR:
          return {
            error: true,
            loading: false,
            rides:  state,
            };
      case ACTION_TYPES.UPDATE_START:
          return {
            loading: true,
            error: false,
            rides: state,
          };
       case ACTION_TYPES.UPDATE_SUCCESS:
          return {
            loading: false,
            error: false,
            rides: state,
          };   
       case ACTION_TYPES.UPDATE_ERROR:
          return {
            loading: false,
            error: true,
            rides: state,
          };   
            



    default:
      return state;
  }
};
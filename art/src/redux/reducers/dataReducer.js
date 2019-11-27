import {
  SET_PAINTINGS,
  LIKE_PAINTING,
  UNLIKE_PAINTING,
  LOADING_DATA
} from "../types";

const initialState = {
  paintings: [],
  painting: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_PAINTINGS:
      return {
        ...state,
        paintings: action.payload,
        loading: false
      };
    case LIKE_PAINTING:
    case UNLIKE_PAINTING:
      let index = state.paintings.findIndex(
        painting => painting.paintingId === action.payload.paintingId
      );
      state.paintings[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}

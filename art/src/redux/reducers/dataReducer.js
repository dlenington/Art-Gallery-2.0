import {
  SET_PAINTINGS,
  LIKE_PAINTING,
  UNLIKE_PAINTING,
  LOADING_DATA,
  DELETE_PAINTING,
  POST_PAINTING,
  SET_PAINTING
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
    case SET_PAINTING:
      return {
        ...state,
        painting: action.payload
      };
    case LIKE_PAINTING:
    case UNLIKE_PAINTING:
      let index = state.paintings.findIndex(
        painting => painting.paintingId === action.payload.paintingId
      );
      state.paintings[index] = action.payload;
      if (state.painting.paintingId === action.payload.paintingId) {
        state.painting = action.payload;
      }
      return {
        ...state
      };
    case DELETE_PAINTING:
      let indexx = state.paintings.findIndex(
        painting => painting.paintingId === action.payload
      );
      state.paintings.splice(indexx, 1);
      return {
        ...state
      };
    case POST_PAINTING:
      return {
        ...state,
        paintings: [action.payload, ...state.paintings]
      };
    default:
      return state;
  }
}

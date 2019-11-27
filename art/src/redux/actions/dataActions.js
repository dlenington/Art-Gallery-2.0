import {
  SET_PAINTINGS,
  LOADING_DATA,
  LIKE_PAINTING,
  UNLIKE_PAINTING
} from "../types";
import axios from "axios";

//Get all paintings
export const getPaintings = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/paintings")
    .then(res => {
      dispatch({
        type: SET_PAINTINGS,
        payload: res.data
      });
    })
    .catch(err => {
      //clear out the paintings
      dispatch({
        type: SET_PAINTINGS,
        payload: []
      });
    });
};

//Like a painting
export const likePainting = paintingId => dispatch => {
  axios
    .get(`/paintings/${paintingId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_PAINTING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Unlike a painting
export const unlikePainting = paintingId => dispatch => {
  axios
    .get(`/paintings/${paintingId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_PAINTING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

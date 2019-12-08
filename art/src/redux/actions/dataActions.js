import {
  SET_PAINTINGS,
  LOADING_DATA,
  LIKE_PAINTING,
  UNLIKE_PAINTING,
  DELETE_PAINTING,
  SET_ERRORS,
  POST_PAINTING,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_PAINTING,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
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

export const getPainting = paintingId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/paintings/${paintingId}`)
    .then(res => {
      dispatch({
        type: SET_PAINTING,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
//Post a painting
export const postPainting = newPainting => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/paintings", newPainting)
    .then(res => {
      dispatch({
        type: POST_PAINTING,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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
//Submit a comment
export const submitComment = (paintingId, commentData) => dispatch => {
  axios
    .post(`/paintings/${paintingId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deletePainting = paintingId => dispatch => {
  axios
    .delete(`/paintings/${paintingId}`)
    .then(() => {
      dispatch({ type: DELETE_PAINTING, payload: paintingId });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

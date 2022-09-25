import { FETCH_ALL } from '../constants/actionTypes';
import * as api from "../api/axios";


export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
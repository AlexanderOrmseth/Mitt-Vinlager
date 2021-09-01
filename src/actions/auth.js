import axios from "axios";
import { toast } from "react-hot-toast";

export const loggedIn = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/loggedin");

    if (res.data.success) {
      dispatch({
        type: "IS_LOGGED_IN",
        payload: res.data.user,
      });
    }
  } catch (err) {
    if (err.response?.data) {
      if (err.response.data?.message) {
        toast.error(err.response.data.msg);
      }
      dispatch({
        type: "IS_LOGGED_IN",
        payload: err.response.data.user,
      });
    } else {
      console.log(err);
      dispatch({
        type: "REMOVE_USER",
        payload: { user: { done: true } },
      });
    }
  }
};
export const signOut = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/signout");
    if (res.data.success) {
      dispatch({
        type: "REMOVE_USER",
        payload: res.data.user,
      });
      toast.success(res.data.msg);
    }
  } catch (err) {
    if (err.response?.data) {
      if (err.response.data?.message) {
        toast.error(err.response.data.msg);
      }
      dispatch({
        type: "REMOVE_USER",
        payload: err.response.data.user,
      });
    } else {
      console.log(err);
      dispatch({
        type: "REMOVE_USER",
        payload: { user: { done: true } },
      });
    }
  }
};

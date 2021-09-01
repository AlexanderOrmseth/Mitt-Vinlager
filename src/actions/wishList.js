import axios from "axios";
import { toast } from "react-hot-toast";

export const getWishList = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/wishlist");
    console.log("List fetched from server");

    dispatch({
      type: "SET_WISH_LIST",
      payload: data,
    });
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.msg);
    } else {
      console.log(err);
    }
  }
};

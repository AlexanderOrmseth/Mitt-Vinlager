import axios from "axios";
import { toast } from "react-hot-toast";

export const getWine = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/wine");
    console.log("Wine fetched from server");
    dispatch({
      type: "SET_WINE_LIST",
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

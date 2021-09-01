import axios from "axios";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

import { toast } from "react-hot-toast";

const GoogleButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (googleData) => {
    try {
      const res = await axios.post(
        "/auth/google",
        {
          token: googleData.tokenId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        dispatch({ type: "SET_USER", payload: res.data.user });
        toast.success(res.data.msg, {
          icon: "👋",
        });
        history.push("/");
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error(err.response.data.msg);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logg inn"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleButton;

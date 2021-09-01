import WineForm from "../../forms/wineForm/WineForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { getWine as getWineToRedux } from "../../../actions/wine";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../../custom/Loading";

import FormBlockContent from "../../forms/FormBlockContent";

const AddWine = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  if (!user.done) {
    return <Loading />;
  }

  if (!user?.email && user.done) {
    return <Redirect to="/home" />;
  }

  const addWine = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/wine", values);

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(getWineToRedux());

        setIsLoading(false);
        // redirect
        history.push("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        // no response = front-end error
        console.log("Error", err);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <WineForm isLoading={isLoading} submitValues={addWine}>
        <FormBlockContent title="Ny vin">
          <p>
            Bruk varenummer / link fra Vinmonopolet, eller fyll ut feltene
            manuelt.
          </p>
        </FormBlockContent>
      </WineForm>
    </div>
  );
};

export default AddWine;

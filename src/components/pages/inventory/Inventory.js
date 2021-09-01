import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../../custom/Loading";
import WineList from "./list/WineList";

import "./Inventory.css";
const Inventory = () => {
  const user = useSelector((state) => state.user);

  // loading -> show loading
  if (user.done === false) {
    return <Loading />;
  }

  // finished loading -> show wine
  if (user?.email) {
    return <WineList />;
  }

  // no user -> redirect
  return (
    <div>
      <Redirect to="/home" />
    </div>
  );
};

export default Inventory;

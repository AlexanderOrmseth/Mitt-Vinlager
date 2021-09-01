import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Wine from "./Wine";
import { toast } from "react-hot-toast";
import Loading from "../../custom/Loading";

import { useSelector } from "react-redux";

// modal
import ModalDelete from "../../modals/ModalDelete";
import ModalDrank from "../../modals/ModalDrank";

const WineView = (props) => {
  const wineFromRedux = useSelector((state) => state.wine);

  const [wine, setWine] = useState(null);
  const history = useHistory();

  const [deleteModal, setDeleteModal] = useState();
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const [drankModal, setDrankModal] = useState(false);
  const handleCloseDrankModal = () => {
    setDrankModal(false);
  };

  useEffect(() => {
    // maybe experiment with getting it from sate?
    if (wineFromRedux) {
      // er i redux
      const exists = wineFromRedux.find((w) => w._id === props.match.params.id);
      if (exists) {
        // hent fra redux
        setWine(exists);
      } else {
        // finnes ikke i redux, hent fra server
        getWine();
      }
    } else {
      // rexus state er null, hent fra sever
      getWine();
    }
  }, [wineFromRedux]);

  const getWine = async () => {
    try {
      const res = await axios.get(`/wine/${props.match.params.id}`);
      if (res.data.success) {
        setWine(res.data.wine);
        console.log(res.data.msg);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        console.log(err);
      }
      // redirect
      history.push("/");
    }
  };

  const editWineLink = () => {
    history.push("/wine/edit/" + wine._id);
  };

  return (
    <>
      {wine ? (
        <div className="wine-view-wrap">
          <Wine
            setDeleteModal={setDeleteModal}
            setDrankModal={setDrankModal}
            wine={wine}
            editWineLink={editWineLink}
          />

          <ModalDrank
            id={wine._id}
            closeModal={handleCloseDrankModal}
            isOpen={drankModal}
          />

          <ModalDelete
            wine={{
              id: wine._id,
              amount: wine.amount,
              year: wine.year,
              name: wine.name,
            }}
            isOpen={deleteModal}
            closeModal={handleCloseDeleteModal}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default WineView;

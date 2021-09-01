import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import WineForm from "../../forms/wineForm/WineForm";
import ModalDelete from "../../modals/ModalDelete";

import { getWine as getWineToRedux } from "../../../actions/wine";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { dateToString, timeSince } from "../../functions/common";
import FormBlockContent from "../../forms/FormBlockContent";
import Loading from "../../custom/Loading";

const EditWine = (props) => {
  const wineFromRedux = useSelector((state) => state.wine);
  const [wine, setWine] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // modal
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    // maybe experiment with getting it from sate?
    if (wineFromRedux) {
      const exists = wineFromRedux.find((w) => w._id === props.match.params.id);
      if (exists) {
        setWine(exists);
      } else {
        getWine();
      }
    } else {
      getWine();
    }
  }, []);

  const getWine = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/wine/${props.match.params.id}`);
      if (res.data.success) {
        setWine(res.data.wine);
        console.log(res.data.msg);
        setIsLoading(false);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        // no response = front-end error
        console.log("Error", err);
      }
      setIsLoading(false);
      // redirect
      history.push("/");
    }
  };

  if (!wine) {
    return <Loading />;
  }

  const editWine = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.put("/wine/edit/" + wine._id, values);
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

  // Modal Delete
  const handleCloseDeleteModal = () => setDeleteModal(false);
  const deleteModalData = {
    name: wine.name,
    id: wine._id,
    year: wine.year,
    amount: wine.amount,
  };

  return (
    <div>
      <ModalDelete
        wine={deleteModalData}
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
      />
      <WineForm
        isLoading={isLoading}
        wineValues={wine}
        openDeleteModal={setDeleteModal}
        submitValues={editWine}
      >
        <FormBlockContent title="Rediger">
          <p>
            <span>Sist endret: </span>
            {wine.updatedAt !== wine.createdAt
              ? `${timeSince(new Date(wine.updatedAt))} siden`
              : " ingen endringer"}
          </p>
          <p>
            <span>Opprettet: </span>
            {dateToString(new Date(wine.createdAt))}
          </p>
        </FormBlockContent>
      </WineForm>
    </div>
  );
};

export default EditWine;

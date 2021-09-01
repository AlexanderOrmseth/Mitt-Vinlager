import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWine as getWineToRedux } from "../../actions/wine";
import { toast } from "react-hot-toast";
import { Trash2 } from "react-feather";
import Button from "../custom/Button";
// modal
import ModalHeader from "./ModalHeader";
import Modal from "react-modal";
Modal.setAppElement("#root");
const modalStyles = {
  content: {
    border: "1px solid #8c031a",
    boxShadow:
      "0 1.6px 3.6px 0 rgb(0 0 0 / 10%), 0 0.3px 0.9px 0 rgb(0 0 0 / 22%)",
  },
};

const ModalDelete = ({ isOpen, wine, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const sliceText = (text, num) =>
    text.length > num ? text.slice(0, num) + "..." : text;

  const deleteWine = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/wine/${wine.id}`);

      if (res.data.success) {
        toast.success(res.data.msg);

        // get wine
        dispatch(getWineToRedux());

        // redirect
        setIsLoading(false);
        closeModal();
        history.push("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        console.log("Error", err);
      }

      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      contentLabel="Slett vin"
      onRequestClose={closeModal}
    >
      <div className="modal">
        <ModalHeader title="Slett" handleCloseModal={closeModal} />
        <div className="modal-info">
          <h3>
            Vil du slette <span>{sliceText(wine.name, 40)}</span>?
          </h3>
          <div>
            <p>
              <span>Årgang:</span> {wine.year}
            </p>
            <p>
              <span>Antall på lager:</span> {wine.amount}
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button
            disabled={isLoading}
            type="button"
            className="button"
            onClick={closeModal}
          >
            Tilbake
          </button>
          <Button
            onClick={deleteWine}
            icon={<Trash2 size={18} />}
            isDelete
            isLoading={isLoading}
            text="Slett"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;

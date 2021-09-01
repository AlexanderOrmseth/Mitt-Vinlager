import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getWine as getWineToRedux } from "../../actions/wine";
import { toast } from "react-hot-toast";
import DatePicker from "../custom/DatePicker";
import Button from "../custom/Button";

// modal
import ModalHeader from "./ModalHeader";
import Modal from "react-modal";
Modal.setAppElement("#root");

const ModalDrank = ({ isOpen, closeModal, id }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const closeDrankModal = () => {
    // reset on close
    setDate(new Date());
    closeModal();
  };

  const handleDrankClicked = async () => {
    if (!date) {
      toast.error("Ugyldig dato");
      return false;
    }
    //await getWine();
    setIsLoading(true);
    try {
      const res = await axios.put("/wine/drank/" + id, { date });

      if (res.data.success) {
        toast.success(res.data.msg);
        // get wine

        dispatch(getWineToRedux());

        setIsLoading(false);
        closeDrankModal();
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error(err.response.data.msg);
      } else {
        console.log(err);
      }

      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Drukket"
      onRequestClose={closeDrankModal}
    >
      <div className="modal">
        <ModalHeader title="Drukket" handleCloseModal={closeDrankModal} />
        <div className="modal-info">
          <div className="modal-inputs">
            <label className="label">Velg dato</label>
            <DatePicker value={date} onChange={setDate} text="Drukket dato" />
          </div>
          <p className="modal-p">
            Denne funksjonen trekker fra 1 fra vinens antall og legger til en{" "}
            <span>drukket-dato</span>. Hver vin kan ha 10{" "}
            <span>drukket-datoer</span> og disse vil bli lagret, eldre datoer
            blir automatisk overskrevet.
          </p>
        </div>

        <div className="modal-actions">
          <Button
            onClick={handleDrankClicked}
            primary
            isLoading={isLoading}
            text="Sett drukket"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalDrank;

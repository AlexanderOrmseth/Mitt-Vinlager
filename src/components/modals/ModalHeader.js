import { X } from "react-feather";
const ModalHeader = ({ handleCloseModal, title }) => {
  return (
    <div className="modal-title">
      <h2>{title}</h2>
      <button type="button" className="button icon" onClick={handleCloseModal}>
        <X size="15" />
        Lukk
      </button>
    </div>
  );
};

export default ModalHeader;

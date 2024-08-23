/* eslint-disable react/prop-types */
import "./style.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

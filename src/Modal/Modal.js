import React, { useEffect } from "react";
import "./Modal.css";
import 'intro.js/introjs.css';

const Modal = (props) => {
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
};

export default Modal;

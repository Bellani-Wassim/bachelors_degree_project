import React from 'react';
import Button from './Button';
import "../../assets/styles/modal.css";

function Model({ display, title, children, onDismissButton, actionButton, onActionButton }) {
  return (
    <div className={`modal-container ${display ? "" : "d-none"}`}>
      <div className="modal">
        <h4 className="modal-title">{title}</h4>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <Button type="secondary" onClick={onDismissButton}>Annuler</Button>
          <Button onClick={onActionButton}>{actionButton}</Button>
        </div>
      </div>
    </div>);
}

export default Model;
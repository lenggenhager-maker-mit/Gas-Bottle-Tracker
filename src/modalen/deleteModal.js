import React from "react";
import "./popUp.css";
import { deleteBottle } from "./updateFireStore";

const DeleteModal = ({ isOpen, onClose, selectedBottle }) => {
  if (!isOpen || !selectedBottle) return null;

  const handleDelete = async () => {
    try {
      await deleteBottle(selectedBottle);
      alert(`Flasche ${selectedBottle.id} wurde gelöscht.`);
      onClose();
    } catch (error) {
      console.error("❌ Fehler beim Löschen:", error);
      alert("Fehler beim Löschen der Flasche. Siehe Konsole für Details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Flasche {selectedBottle.id} löschen?</h3>
        <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>

        <div className="modal-buttons">
          <button
            type="button"
            onClick={handleDelete} // ✅ this was missing
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Löschen
          </button>

          <br />

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

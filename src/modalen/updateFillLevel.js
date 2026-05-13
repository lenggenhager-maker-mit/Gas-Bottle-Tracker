import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./popUp.css";

const UpdateFillLevel = ({ isOpen, onClose, selectedBottle }) => {
  const [added, setAdded] = useState("");
  const [removed, setRemoved] = useState("");

  if (!isOpen || !selectedBottle) return null;

  // ✅ Check if selected bottle is KM
  const isREC = selectedBottle?.bottleType === "REC" || false;

  const resetForm = () => {
    setAdded("");
    setRemoved("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      const newFuellstand = isREC
        ? Number(selectedBottle.fuellstand || 0) +
          Number(added || 0) -
          Number(removed || 0)
        : Number(selectedBottle.fuellstand || 0) - Number(removed || 0);

      await updateDoc(bottleRef, {
        fuellstand: newFuellstand,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("❌ Error updating bottle:", error);
      alert("Error updating bottle. Check console for details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Füllstand</h3>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <input
            type="number"
            placeholder="Menge eingefüllt (kg)"
            value={added}
            onChange={(e) => setAdded(e.target.value)}
            disabled={!isREC}
            className={!isREC ? "disabledInput" : ""}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="Menge gebraucht (kg)"
            value={removed}
            onChange={(e) => setRemoved(e.target.value)}
          />
          <br />
          <br />

          <button
            type="submit"
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
            Save
          </button>

          <br />

          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
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
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFillLevel;

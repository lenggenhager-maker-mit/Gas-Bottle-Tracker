import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import "./popUp.css";

const UpdateFillLevel = ({ isOpen, onClose, selectedBottle }) => {
  const [quality, setQuality] = useState("");
  const [newFuellstand, setNewFuellstand] = useState("");

  useEffect(() => {
    if (isOpen && selectedBottle) {
      setQuality(selectedBottle.quality || "");

      // IMPORTANT: do not prefill
      setNewFuellstand("");
    }
  }, [isOpen, selectedBottle]);

  if (!isOpen || !selectedBottle) return null;

  // Mark bottle as "zu ruckgeben"
  const markAsRueckgeben = async () => {
    const confirm = window.confirm(
      "Diese Aktion kann nicht rückgängig gemacht werden. Wirklich auf 'zu ruckgeben' setzen?"
    );

    if (!confirm) return;

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      await updateDoc(bottleRef, {
        quality: "ruckgeben",
      });

      setQuality("ruckgeben");
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Flasche:", error);
      alert("Fehler beim Aktualisieren. Siehe Konsole.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {};

    // only update if user entered a value AND it changed
    if (
      newFuellstand !== "" &&
      Number(newFuellstand) !== selectedBottle.fuellstand
    ) {
      updateData.fuellstand = Number(newFuellstand);
    }

    if (Object.keys(updateData).length === 0) {
      alert("Keine Änderungen erkannt.");
      return;
    }

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      await updateDoc(bottleRef, updateData);

      alert(`Flasche ${selectedBottle.id} wurde aktualisiert.`);
      onClose();
    } catch (error) {
      console.error("❌ Error updating bottle:", error);
      alert("Fehler beim Aktualisieren der Flasche. Siehe Konsole.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update {selectedBottle.id}</h3>

        <p>
          Gas: {selectedBottle.gasTyp}
          <br />
          Grösse: {selectedBottle.bottleGrosse} kg
          <br />
          Aktueller Füllstand: {selectedBottle.fuellstand} kg
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          {/* Rückgeben Button */}
          {quality !== "ruckgeben" ? (
            <button
              type="button"
              onClick={markAsRueckgeben}
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
              Als "zu ruckgeben" ↩️ kennzeichnen
            </button>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Flasche ist zu ruckgeben ↩️
            </span>
          )}

          <br />
          <br />

          {/* Clean input (no current value shown anywhere) */}
          <input
            type="number"
            placeholder="Neuer Füllstand (kg)"
            value={newFuellstand}
            onChange={(e) => setNewFuellstand(e.target.value)}
          />

          <br />
          <br />

          {/* Save Button */}
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

          {/* Close Button */}
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
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFillLevel;

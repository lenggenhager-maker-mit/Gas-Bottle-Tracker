import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import "./popUp.css";

const UpdateVerbrauchsgas = ({ isOpen, onClose, selectedBottle }) => {
  const [quality, setQuality] = useState("");
  const [fuellstand, setFuellstand] = useState("");

  useEffect(() => {
    if (isOpen && selectedBottle) {
      setQuality(selectedBottle.quality || "");

      setFuellstand(String(selectedBottle.fuellstand || ""));
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

      // Update local state without closing modal
      setQuality("ruckgeben");
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);

      alert("Fehler beim Aktualisieren.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fuellstand === "") {
      alert("Bitte Füllstand auswählen.");

      return;
    }

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      await updateDoc(bottleRef, {
        fuellstand: Number(fuellstand),
      });

      alert(`Flasche ${selectedBottle.id} wurde aktualisiert.`);

      onClose();
    } catch (error) {
      console.error("❌ Error updating bottle:", error);

      alert("Fehler beim Aktualisieren der Flasche.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update {selectedBottle.id}</h3>

        <p>
          Gas: {selectedBottle.gasTyp}
          <br />
          Grösse: {selectedBottle.bottleGrosse} L
          <br />
          Aktueller Füllstand: {selectedBottle.fuellstand}%
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
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Flasche ist zu ruckgeben ↩️
            </span>
          )}

          <br />
          <br />

          {/* Fill Level Selection */}
          <select
            value={fuellstand}
            onChange={(e) => setFuellstand(e.target.value)}
          >
            <option value="">Füllstand wählen</option>

            <option value="0">Leer (0%)</option>

            <option value="50">In Verbrauch (50%)</option>

            <option value="100">Voll (100%)</option>
          </select>

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

export default UpdateVerbrauchsgas;

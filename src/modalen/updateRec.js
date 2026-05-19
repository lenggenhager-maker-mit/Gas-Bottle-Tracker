import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import GasDropdown from "../util/gasDropdown";

import "./popUp.css";

const UpdateRec = ({ isOpen, onClose, selectedBottle }) => {
  const [gasTyp, setGasTyp] = useState("");
  const [quality, setQuality] = useState("");
  const [newFuellstand, setNewFuellstand] = useState("");

  useEffect(() => {
    if (isOpen && selectedBottle) {
      setGasTyp(selectedBottle.gasTyp || "");
      setQuality(selectedBottle.quality || "");

      // keep input empty on open
      setNewFuellstand("");
    }
  }, [isOpen, selectedBottle]);

  if (!isOpen || !selectedBottle) return null;

  const markAsEntsorgen = async () => {
    const confirm = window.confirm(
      "Diese Aktion kann nicht rückgängig gemacht werden. Wirklich auf 'zu entsorgen' setzen?"
    );

    if (!confirm) return;

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      await updateDoc(bottleRef, {
        quality: "entsorgen",
      });

      setQuality("entsorgen");
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Flasche:", error);
      alert("Fehler beim Aktualisieren. Siehe Konsole.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gasTyp) {
      alert("Bitte füllen Sie das Feld Gastyp aus.");
      return;
    }

    const updateData = {};

    // only update gasTyp if changed
    if (gasTyp !== selectedBottle.gasTyp) {
      updateData.gasTyp = gasTyp;
    }

    // only update fuellstand if user entered a value
    if (
      newFuellstand !== "" &&
      Number(newFuellstand) !== selectedBottle.fuellstand
    ) {
      updateData.fuellstand = Number(newFuellstand);
    }

    // nothing changed → do nothing
    if (Object.keys(updateData).length === 0) {
      alert("Keine Änderungen erkannt.");
      return;
    }

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      await updateDoc(bottleRef, updateData);

      alert(`REC-Flasche ${selectedBottle.id} wurde aktualisiert.`);
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
          <GasDropdown
            placeholder="Gas Typ"
            value={gasTyp}
            onChange={(e) => setGasTyp(e.target.value)}
          />

          <br />
          <br />

          {quality !== "entsorgen" ? (
            <button
              type="button"
              onClick={markAsEntsorgen}
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
              Als "zu entsorgen" ⚠️ kennzeichnen
            </button>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Flasche ist zu entsorgen ⚠️
            </span>
          )}

          <br />
          <br />

          {/* Füllstand input with placeholder instead of prefill */}
          <input
            type="number"
            placeholder="Neuer Füllstand (kg)"
            value={newFuellstand}
            onChange={(e) => setNewFuellstand(e.target.value)}
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

export default UpdateRec;

import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
//import GasDropdown from "../util/gasDropdown";
import "./popUp.css";

const UpdateRec = ({ isOpen, onClose, selectedBottle }) => {
  const [gasTyp, setGasTyp] = useState("");
  const [quality, setQuality] = useState("");
  const [added, setAdded] = useState("");
  const [removed, setRemoved] = useState("");

  const isREC = selectedBottle?.bottleType === "REC" || false;

  useEffect(() => {
    if (isOpen && selectedBottle) {
      setGasTyp(selectedBottle.gasTyp || "");
      setQuality(selectedBottle.quality || "");
      setAdded("");
      setRemoved("");
    }
  }, [isOpen, selectedBottle]);

  if (!isOpen || !selectedBottle) return null;

  // Handler to mark bottle as "zu entsorgen"
  const markAsEntsorgen = async () => {
    const confirm = window.confirm(
      "Diese Aktion kann nicht rückgängig gemacht werden. Wirklich auf 'zu ruckgeben' setzen?"
    );
    if (!confirm) return;

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);
      await updateDoc(bottleRef, { quality: "ruckgeben" });

      // ✅ Update local state so modal reflects change without closing
      setQuality("ruckgeben");
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Flasche:", error);
      alert("Fehler beim Aktualisieren. Siehe Konsole.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if (!gasTyp) {
    // alert("Bitte füllen Sie das Feld Gastyp aus.");
    // return;
    //}

    try {
      const bottleRef = doc(db, "bottles", selectedBottle.id);

      const newFuellstand =
        Number(selectedBottle.fuellstand || 0) +
        Number(added || 0) -
        Number(removed || 0);

      await updateDoc(bottleRef, {
        //gasTyp,
        fuellstand: newFuellstand,
      });

      alert(`Flasche ${selectedBottle.id} wurde aktualisiert.`);
      onClose(); // Only close after saving changes
    } catch (error) {
      console.error("❌ Error updating bottle:", error);
      alert("Fehler beim Aktualisieren der Flasche. Siehe Konsole.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Flasche {selectedBottle.id}</h3>
        <p>
          Gas: {selectedBottle.gasTyp}
          <br />
          Füllstand: {selectedBottle.fuellstand}
        </p>
        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          {/* Entsorgen Button or Warning */}
          {quality !== "ruckgeben" ? (
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
              Als "zu ruckgeben" ↩️ kennzeichnen
            </button>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Flasche ist zu ruckgeben ↩️
            </span>
          )}
          <br />
          <br />

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

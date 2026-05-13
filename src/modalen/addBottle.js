import { useState } from "react";
import { addBottle } from "./updateFireStore";
import GasDropdown from "../util/gasDropdown";

import "./popUp.css";

const AddBottle = ({ isOpen, onClose, bottles }) => {
  const [bottleNumber, setBottleNumber] = useState("");
  const [bottleType, setBottleType] = useState("");
  const [gasTyp, setGasTyp] = useState("");
  const [fuellstand, setFuellstand] = useState("");
  const [grosse, setGrosse] = useState("");
  const [standort, setStandort] = useState("");
  const [quality, setQuality] = useState("");

  const resetForm = () => {
    setBottleType("");
    setBottleNumber("");
    setGrosse("");
    setGasTyp("");
    setFuellstand("");
    setStandort("");
    setQuality("");
  };

  const handleAddBottle = async (e) => {
    e.preventDefault();

    if (
      !bottleNumber ||
      !bottleType ||
      !gasTyp ||
      !standort ||
      !grosse ||
      fuellstand === ""
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const newBottle = {
        bottleType,
        bottleNumber,
        grosse: Number(grosse),
        gasTyp,
        standort,
        quality: "usable",
        fuellstand: Number(fuellstand),
      };

      await addBottle(newBottle, bottles);
      alert("Data Successfully Submitted");

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding bottle:", error);
      // Show Firestore errors in a popup alert
      alert(
        error.message || "Failed to add bottle. Check console for details."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Neue Flasche anlegen</h3>
        <form onSubmit={handleAddBottle} style={{ marginTop: "30px" }}>
          <select
            value={bottleType}
            onChange={(e) => setBottleType(e.target.value)}
          >
            <option value="">Flasche Typ</option>
            <option value="KM">Kältemittel</option>
            <option value="REC">Recycling</option>
            <option value="GAS">Verbrauchsgas</option>
          </select>
          <br />
          <br />

          <input
            type="text"
            placeholder="Flasche Nummer"
            value={bottleNumber}
            onChange={(e) => setBottleNumber(e.target.value)}
          />
          <br />
          <br />

          <input
            type="number"
            placeholder="Grösse (kg)"
            value={grosse}
            onChange={(e) => setGrosse(e.target.value)}
          />
          <br />
          <br />

          <GasDropdown
            value={gasTyp}
            onChange={(e) => setGasTyp(e.target.value)}
          />
          <br />
          <br />

          <input
            type="number"
            placeholder="Füllstand (kg)"
            value={fuellstand}
            onChange={(e) => setFuellstand(e.target.value)}
          />
          <br />
          <br />

          <input
            type="text"
            placeholder="Standort"
            value={standort}
            onChange={(e) => setStandort(e.target.value)}
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

export default AddBottle;

import React, { useState } from "react";

import DeleteModal from "./deleteModal";
import AddBottle from "./addBottle";
import UpdateFillLevel from "./updateFillLevel";
import UpdateRec from "./updateRec";
import UpdateVerbrauchsgas from "./updateVerbrauchsgas";

const ModalBar = ({ selectedBottle, bottles }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    // Require selected bottle for all except add
    if (modalName !== "add" && !selectedBottle) {
      alert("Please select a bottle.");
      return;
    }

    // Special handling for update bottle
    if (modalName === "updateBottle") {
      if (selectedBottle?.bottleType === "REC") {
        setActiveModal("updateRec");
        return;
      }

      if (selectedBottle?.bottleType === "GAS") {
        setActiveModal("updateVerbrauchsgas");
        return;
      }

      // Default update modal
      setActiveModal("updateFill");
      return;
    }

    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div>
      {/* Add Bottle */}
      <button onClick={() => openModal("add")}>Neue Flasche</button>

      {/* Delete Bottle */}
      <button onClick={() => openModal("delete")}>Flasche löschen</button>

      {/* Dynamic Update Button */}
      <button onClick={() => openModal("updateBottle")}>Update Flasche</button>

      {/* Add Bottle Modal */}
      <AddBottle
        isOpen={activeModal === "add"}
        onClose={closeModal}
        bottles={bottles}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={activeModal === "delete"}
        onClose={closeModal}
        selectedBottle={selectedBottle}
      />

      {/* Standard Fill Level Update */}
      <UpdateFillLevel
        isOpen={activeModal === "updateFill"}
        onClose={closeModal}
        selectedBottle={selectedBottle}
      />

      {/* REC Bottle Update */}
      <UpdateRec
        isOpen={activeModal === "updateRec"}
        onClose={closeModal}
        selectedBottle={selectedBottle}
      />

      {/* Verbrauchsgas Update */}
      <UpdateVerbrauchsgas
        isOpen={activeModal === "updateVerbrauchsgas"}
        onClose={closeModal}
        selectedBottle={selectedBottle}
      />
    </div>
  );
};

export default ModalBar;

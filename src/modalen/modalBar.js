import React, { useState } from "react";
import DeleteModal from "./deleteModal";
import AddBottle from "./addBottle";
import UpdateFillLevel from "./updateFillLevel";
import UpdateRec from "./updateRec";

const ModalBar = ({ selectedBottle, bottles }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isUpdateRecOpen, setIsUpdateRecOpen] = useState(false);

  // Delete modal handlers
  const openModalDelete = () => {
    if (!selectedBottle) {
      alert("Please select a bottle.");
      return;
    }
    setIsDeleteOpen(true);
  };
  const closeModalDelete = () => setIsDeleteOpen(false);

  // Add modal handlers
  const openModalAdd = () => setIsAddOpen(true);
  const closeModalAdd = () => setIsAddOpen(false);

  // Update Fill Level modal handlers
  const openModalUpdate = () => {
    if (!selectedBottle) {
      alert("Please select a bottle.");
      return;
    }
    setIsUpdateOpen(true);
  };
  const closeModalUpdate = () => setIsUpdateOpen(false);

  // Update Rec modal handlers
  const openModalUpdateRec = () => {
    if (!selectedBottle || selectedBottle.bottleType !== "REC") {
      alert("Please select a REC bottle");
      return;
    }
    setIsUpdateRecOpen(true);
  };
  const closeModalUpdateRec = () => setIsUpdateRecOpen(false);

  return (
    <div>
      {/* Add Bottle */}
      <button onClick={openModalAdd}>Neue Flasche</button>
      <AddBottle isOpen={isAddOpen} onClose={closeModalAdd} bottles={bottles} />

      {/* Delete Bottle */}
      <button onClick={openModalDelete}>Flasche loschen</button>
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={closeModalDelete}
        selectedBottle={selectedBottle}
      />

      {/* Update Fill Level */}
      <button onClick={openModalUpdate}>Update Füllstand</button>
      <UpdateFillLevel
        isOpen={isUpdateOpen}
        onClose={closeModalUpdate}
        selectedBottle={selectedBottle}
      />

      {/* Update Rec Bottle */}
      <button onClick={openModalUpdateRec}>Update Rec Flasche</button>
      <UpdateRec
        isOpen={isUpdateRecOpen}
        onClose={closeModalUpdateRec}
        selectedBottle={selectedBottle}
      />
    </div>
  );
};

export default ModalBar;

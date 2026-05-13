import React, { useState, useEffect } from "react";
import ModalBar from "./modalen/modalBar.js";
import FilterableBottleTable from "./machineTable/filterableBottleTable.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function BottleTracker() {
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [bottles, setBottles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bottles"), (snapshot) => {
      const bottlesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBottles(bottlesData);

      // Update selectedBottle safely using functional update
      setSelectedBottle((prevSelected) => {
        if (!prevSelected) return null; // nothing selected
        const updated = bottlesData.find((b) => b.id === prevSelected.id);
        return updated || null; // deselect if deleted
      });
    });

    return () => unsubscribe();
  }, []);

  console.log("Submitting for bottle:", selectedBottle);
  return (
    <div>
      <h3>Gasflaschenlager</h3>

      <ModalBar selectedBottle={selectedBottle} bottles={bottles} />

      <FilterableBottleTable
        selectedBottle={selectedBottle}
        onSelectBottle={setSelectedBottle}
        bottles={bottles}
        setBottles={setBottles}
      />
    </div>
  );
}

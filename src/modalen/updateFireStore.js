import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

/** ------------------------------
 *  Add a new bottle
 *  ------------------------------ */
export async function addBottle(bottleData) {
  if (!bottleData.bottleNumber) {
    throw new Error("Bottle number is required.");
  }

  const bottleRef = doc(
    db,
    "bottles",
    bottleData.bottleType + "-" + bottleData.bottleNumber
  );

  // Check if document already exists
  const docSnap = await getDoc(bottleRef);
  if (docSnap.exists()) {
    throw new Error("Bottle already exists!");
  }

  await setDoc(bottleRef, {
    bottleType: bottleData.bottleType,
    bottleGrosse: bottleData.grosse,
    gasTyp: bottleData.gasTyp,
    fuellstand: bottleData.fuellstand,
    standort: bottleData.standort,
    quality: bottleData.quality || "",
  });

  console.log(
    `✅ Bottle ${
      bottleData.bottleType + bottleData.bottleNumber
    } added successfully.`
  );
}

/** ------------------------------
 *  Update bottle fill level
 *  ------------------------------ */
export async function updateFillLevel(selectedBottle, newFillLevel) {
  try {
    if (!selectedBottle || !selectedBottle.id) {
      throw new Error("No valid bottle selected.");
    }

    const bottleRef = doc(db, "bottles", selectedBottle.bottleId);

    const added = Number(newFillLevel.added) || 0;
    const removed = Number(newFillLevel.removed) || 0;

    const newFuellstand = selectedBottle.fuellstand + added - removed;
    const newRestkapzitaet = selectedBottle.restkapzitaet - added + removed;

    await updateDoc(bottleRef, {
      fuellstand: newFuellstand,
      restkapzitaet: newRestkapzitaet,
    });

    console.log(`✅ Bottle ${selectedBottle.bottleId} updated successfully.`);
  } catch (error) {
    console.error("❌ Error updating bottle:", error);
  }
}

/** ------------------------------
 *  Delete machine/bottle document
 *  ------------------------------ */
export async function deleteBottle(selectedBottle) {
  try {
    if (!selectedBottle || !selectedBottle.id) {
      throw new Error("No valid bottle selected.");
    }

    const bottleRef = doc(db, "bottles", selectedBottle.id);
    await deleteDoc(bottleRef);

    console.log(`🗑️ Bottle ${selectedBottle.id} deleted successfully.`);
  } catch (error) {
    console.error("❌ Error deleting bottle:", error);
  }
}

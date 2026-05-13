import React, { useState, useEffect } from "react";
import BottleTable from "./bottleTable";
import FlaschentypFilter from "./flaschentypFilter.js";
import GasFilter from "./gasFilter"; // new dropdown component
import PdfCreator from "./pdfCreator";
import "./bottleTable.css";

export default function FilterableBottleTable({
  selectedBottle,
  onSelectBottle,
  bottles,
}) {
  const [flaschentypFilter, setFlaschentypFilter] = useState("");
  const [gasFilter, setGasFilter] = useState("");
  const [showEntsorgenOnly, setShowEntsorgenOnly] = useState(false);

  // Filter function
  function bottleFilter(bottle) {
    // If no filters are set, show all bottles
    if (!flaschentypFilter && !gasFilter) return true;

    const bottleTypeMatch =
      !flaschentypFilter || bottle.bottleType === flaschentypFilter;
    const gasMatch = !gasFilter || bottle.gasTyp === gasFilter;

    return bottleTypeMatch && gasMatch;
  }

  const displayedBottles = bottles
    .filter((bottle) => !showEntsorgenOnly || bottle.quality === "entsorgen")
    .filter(bottleFilter); // keep your existing filters

  return (
    <div>
      <div className="filter-section">
        <GasFilter filterQuery={gasFilter} setFilterQuery={setGasFilter} />

        <FlaschentypFilter
          filterQuery={flaschentypFilter}
          setFilterQuery={setFlaschentypFilter}
        />
        <button onClick={() => setShowEntsorgenOnly((prev) => !prev)}>
          {showEntsorgenOnly ? "Show All" : "zu entsorgen"}
        </button>
        <PdfCreator displayedBottles={displayedBottles} />
      </div>
      <div className="table-section">
        <BottleTable
          bottles={displayedBottles}
          selectedBottle={selectedBottle}
          onSelectBottle={onSelectBottle}
        />
      </div>
    </div>
  );
}

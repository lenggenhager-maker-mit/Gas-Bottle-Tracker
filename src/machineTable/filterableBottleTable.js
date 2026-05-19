import React, { useState } from "react";
import BottleTable from "./bottleTable";
import FlaschentypFilter from "./flaschentypFilter.js";
import GasFilter from "./gasFilter";
import QualityFilter from "./qualityFilter";
import PdfCreator from "./pdfCreator";

import "./bottleTable.css";

export default function FilterableBottleTable({
  selectedBottle,
  onSelectBottle,
  bottles,
}) {
  const [flaschentypFilter, setFlaschentypFilter] = useState("");
  const [gasFilter, setGasFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("");

  // Filter function
  function bottleFilter(bottle) {
    const bottleTypeMatch =
      !flaschentypFilter ||
      bottle.bottleType === flaschentypFilter;

    const gasMatch =
      !gasFilter || bottle.gasTyp === gasFilter;

    const qualityMatch =
      !qualityFilter ||
      bottle.quality === qualityFilter;

    return (
      bottleTypeMatch &&
      gasMatch &&
      qualityMatch
    );
  }

  const displayedBottles = bottles.filter(bottleFilter);

  return (
    <div>
      <div className="filter-section">
        {/* Gas Filter */}
        <GasFilter
          filterQuery={gasFilter}
          setFilterQuery={setGasFilter}
        />

        {/* Bottle Type Filter */}
        <FlaschentypFilter
          filterQuery={flaschentypFilter}
          setFilterQuery={setFlaschentypFilter}
        />

        {/* Quality Filter */}
        <QualityFilter
          filterQuery={qualityFilter}
          setFilterQuery={setQualityFilter}
        />

        {/* PDF Button */}
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
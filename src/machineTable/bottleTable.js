import React, { useState } from "react";
import "./bottleTable.css";

export default function BottleTable({
  bottles,
  selectedBottle,
  onSelectBottle,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBottles = React.useMemo(() => {
    if (!sortConfig.key) return bottles;
    return [...bottles].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [bottles, sortConfig]);

  return (
    <div className="table-container">
      <table className="bottle-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              Flasche{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("gasTyp")}>
              Gas{" "}
              {sortConfig.key === "gasTyp"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("bottleGrosse")}>
              Grösse{" "}
              {sortConfig.key === "bottleGrosse"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("fuellstand")}>
              Füllstand{" "}
              {sortConfig.key === "fuellstand"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>

            <th onClick={() => handleSort("standort")}>
              Standort{" "}
              {sortConfig.key === "standort"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBottles.map((bottle, idx) => {
            const isSelected = selectedBottle?.id === bottle.id;
            const rowClass = isSelected
              ? "selected"
              : idx % 2 === 0
              ? "even"
              : "odd";

            return (
              <tr
                key={bottle.id}
                className={rowClass}
                onClick={() => onSelectBottle(bottle)}
              >
                <td>
                  {bottle.id} {bottle.quality === "entsorgen" && "⚠️"}
                </td>
                <td>
                  {bottle.gasTyp} {bottle.quality === "entsorgen" && "⚠️"}
                </td>

                <td>{bottle.bottleGrosse} kg</td>
                <td>{bottle.fuellstand} kg</td>

                <td>{bottle.standort}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

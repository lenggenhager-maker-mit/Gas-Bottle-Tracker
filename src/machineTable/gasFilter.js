import GasDropdown from "../util/gasDropdown";

export default function GasFilter({ filterQuery, setFilterQuery }) {
  return (
    <label>
      <GasDropdown
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      />
    </label>
  );
}

export default function FlaschentypFilter({ filterQuery, setFilterQuery }) {
  return (
    <label>
      <select
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      >
        <option value="">Flaschentyp</option>
        <option value="KM">KM</option>
        <option value="REC">Recycling</option>
        <option value="GAS">Verbrauchsgas</option>
      </select>
    </label>
  );
}

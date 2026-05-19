export default function QualityFilter({
    filterQuery,
    setFilterQuery,
  }) {
    return (
      <select
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      >
        <option value="">Alle Status</option>
        <option value="entsorgen">Zu entsorgen</option>
        <option value="ruckgeben">Zu rückgeben</option>
      </select>
    );
  }
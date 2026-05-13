// GasDropdown.js
const GasDropdown = ({ value, onChange }) => {
  const gasOptions = [
    { value: "", label: "Gastyp auswahlen" },
    { value: "R134a", label: "R134a" },
    { value: "R1234ze", label: "R1234ze" },
    { value: "R32", label: "R32" },
    { value: "R410a", label: "R410a" },
    { value: "O2", label: "O2" },
    { value: "N", label: "N" },
    { value: "C2H2", label: "C2H2" },
    { value: "unbekannt", label: "unbekannt" },
  ];

  return (
    <select value={value} onChange={onChange}>
      {gasOptions.map((gas) => (
        <option key={gas.value} value={gas.value}>
          {gas.label}
        </option>
      ))}
    </select>
  );
};

export default GasDropdown;

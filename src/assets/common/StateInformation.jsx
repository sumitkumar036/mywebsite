const StateInformation = ({ states, selectedState, onChange }) => {
  return (
    <select className="form-select" value={selectedState} onChange={onChange}>
      <option value="">Select a state</option>
      {states.map((state) => (
        <option key={state.isoCode} value={state.isoCode}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default StateInformation;

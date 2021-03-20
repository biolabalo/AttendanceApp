import './style.scss';

const Toggle = ({ onChange, value }) => {
  return (
    <label className="toggle" onClick={onChange}>
      <input
        onChange={onChange}
        data-test="checkbox"
        type="checkbox"
        className="hidden"
        value={value}
      />
      <div className="toggle-control" />
    </label>
  );
};

export default Toggle;

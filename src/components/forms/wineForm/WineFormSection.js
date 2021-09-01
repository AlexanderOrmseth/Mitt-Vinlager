const WineFormSection = (props) => {
  const display = props.activeTab ? "block" : "none";
  return (
    <div style={{ display }} className="form-section">
      <div className="form-section-content">{props.children}</div>
    </div>
  );
};

export default WineFormSection;

const Label = ({ text, htmlFor, required }) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      {text} {required && <span className="required">*</span>}
    </label>
  );
};

export default Label;

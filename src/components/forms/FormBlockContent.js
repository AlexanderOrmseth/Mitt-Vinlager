const FormBlockContent = ({ children, icon = false, title }) => {
  return (
    <>
      <div className="form-block-title">
        {icon && icon}
        <h2>{title}</h2>
      </div>
      <div className="form-block-content-wrap">
        <div className="form-block-content">{children}</div>
      </div>
    </>
  );
};

export default FormBlockContent;

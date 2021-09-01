import ClipLoader from "react-spinners/ClipLoader";
const Button = ({
  isLoading = null,
  icon = null,
  text = "ok",
  primary = false,
  isDelete = false,
  onClick = null,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`button icon ${isDelete ? "delete" : ""} ${
        primary ? "primary" : ""
      }`}
      disabled={isLoading}
      type={type}
    >
      {isLoading ? (
        <ClipLoader
          color={`${primary ? "#fff" : "#CCC"}`}
          loading={isLoading}
          size={18}
        />
      ) : (
        icon
      )}
      {text}
    </button>
  );
};

export default Button;

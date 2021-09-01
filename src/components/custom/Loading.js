import SyncLoader from "react-spinners/SyncLoader";
const Loading = () => {
  return (
    <div className="white-container cpd">
      <div className="spinner-block">
        <h4 className="title">LASTER</h4>
        <SyncLoader color="#b3b3b3" loading={true} size={7} />
      </div>
    </div>
  );
};

export default Loading;

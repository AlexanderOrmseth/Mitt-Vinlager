const WineListToolBar = ({ count }) => {
  return (
    <div className="toolbar cpd-s">
      <div>
        <p className="tb-count">{count}</p>
      </div>
      <div>paging...</div>
    </div>
  );
};

export default WineListToolBar;

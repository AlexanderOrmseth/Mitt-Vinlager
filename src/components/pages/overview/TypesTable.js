import { Link } from "react-router-dom";
import { fixPrice } from "../../functions/common";
import { useDispatch } from "react-redux";

const TypesTable = ({ typeInfo }) => {
  const dispatch = useDispatch();

  const handleTypeClicked = (type) => {
    dispatch({
      type: "APPLIED_ONE_TERM",
      payload: { types: [type], inStorage: 1 },
    });
    dispatch({
      type: "CHANGED_LIST",
      payload: "CUSTOM_FILTER",
    });
  };

  return (
    <>
      {typeInfo && (
        <div className="wine-table-wrap types-table">
          <div className="wine-table table-header">
            <div>Type</div>
            <div>Antall</div>
            <div>Sum pris</div>
          </div>
          <div className="table-data">
            {typeInfo.map((item, i) => (
              <div className="wine-table" key={i}>
                <div>
                  <Link to="/" onClick={() => handleTypeClicked(item.type)}>
                    {item.type}
                  </Link>
                </div>
                <div>{item.amount}</div>
                <div>{fixPrice(item.sumPrice)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TypesTable;

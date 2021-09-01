import { fixPrice } from "../../functions/common";
const AmountTable = ({ wineInfo }) => {
  return (
    <>
      {wineInfo && (
        <div className="wine-table-wrap amount-table">
          <div className="wine-table table-header">
            <div></div>
            <div>Sum flasker</div>
            <div>Ulike flasker</div>
            <div>Sum pris</div>
          </div>
          <div className="table-data">
            <div className="wine-table">
              <div>{wineInfo.definition}</div>
              <div>{wineInfo.sumBottles}</div>
              <div>{wineInfo.uniqueBottles}</div>
              <div>{fixPrice(wineInfo.sumPrice)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AmountTable;

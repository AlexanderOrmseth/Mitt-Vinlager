import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sliceText, dateToString } from "../../functions/common";

const initialMaxLength = 45;

const DrankTable = ({ drank }) => {
  const [maxLength, setMaxLength] = useState(initialMaxLength);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 570) {
      setMaxLength(20);
    } else if (window.innerWidth < 680) {
      setMaxLength(25);
    } else if (window.innerWidth < 850) {
      setMaxLength(35);
    } else {
      setMaxLength(initialMaxLength);
    }
  };

  return (
    <div className="wine-table-wrap">
      {drank && drank.length > 0 ? (
        <div className="wine-table-wrap drank-table">
          <div className="wine-table table-header">
            <div></div>
            <div>Navn</div>
            <div>Årgang</div>
            <div>Type</div>
            <div>Dato drukket</div>
          </div>
          <div className="table-data">
            {drank.map((item, i) => (
              <div className="wine-table" key={i}>
                <div>{i + 1}.</div>
                <div>
                  <Link to={`/wine/${item.id}`}>
                    {sliceText(item.name, maxLength)}
                  </Link>
                </div>
                <div>{item.year || "-"}</div>
                <div>{item.type}</div>
                <div>{dateToString(new Date(item.date), true, true)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Ingen vin er registrert drukket.</p>
      )}
    </div>
  );
};

export default DrankTable;

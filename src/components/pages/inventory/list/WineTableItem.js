import {
  Edit3 as Edit,
  Trash2 as Trash,
  MinusCircle as Minus,
} from "react-feather";
import { useHistory } from "react-router-dom";
import WineScore from "../../../custom/WineScore";

import { fixPrice } from "../../../functions/common";

import { Link } from "react-router-dom";

const WineTableItem = ({
  wine,
  handleDrankClicked,
  setDeleteModalData,
  setDeleteModal,
}) => {
  const history = useHistory();

  const sliceText = (text, num) =>
    text.length > num ? text.slice(0, num).trim() + "..." : text;

  const fixDrinkBetween = () => {
    let start = wine.dates.drink_between_start;
    let end = wine.dates.drink_between_end;

    if (start) {
      start = start.toString();
    } else {
      start = "??";
    }

    if (end) {
      end = end.toString();
    } else {
      end = "??";
    }
    return `${start} - ${end}`;
  };

  const handleEdit = () => {
    history.push(`/wine/edit/${wine._id}`);
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setDeleteModalData({
      id: wine._id,
      name: wine.name,
      amount: wine.amount,
      year: wine.year,
    });
  };

  return (
    <div className={`wine-table-item ${wine.amount === 0 ? "faded" : ""}`}>
      <div>
        <Link to={`/wine/${wine._id}`}>
          {!!wine.origin.country_code && (
            <div
              className={`flag-icon flag-icon-${wine.origin.country_code}`}
            ></div>
          )}
          {sliceText(wine.name, 35)}
        </Link>
      </div>

      {wine.year > 0 ? <div>{wine.year}</div> : <div>-</div>}

      <div>{wine.type}</div>

      <div className="price">{fixPrice(wine.price)}</div>

      {wine.score ? <WineScore value={wine.score} /> : <div>-</div>}

      <div className="info-tag">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          x="0px"
          y="0px"
          viewBox="0 0 381.361 381.361"
        >
          <path
            id="XMLID_23_"
            d="M233.594,119.917V24.229H214.91V0h-48.459v24.229h-18.684v95.688
                c-35.138,20.67-55.826,67.891-55.826,105.126v156.318h197.478V225.043C289.419,187.808,268.731,140.587,233.594,119.917z
                M175.681,242.742v37.613h-53.739v-37.613H175.681z M259.419,351.361H121.942v-41.006h83.739v-97.613h-82.832
                c4.306-30.112,23.527-60.355,45.794-69.833l9.125-3.884V54.229h25.826v84.796l9.125,3.884c25.314,10.774,46.7,48.387,46.7,82.134
                V351.361z"
          />
        </svg>
        <span>{wine.amount}</span>
      </div>

      {wine.dates.drink_between_start || wine.dates.drink_between_end ? (
        <div className="info-tag">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            x="0px"
            y="0px"
            viewBox="0 0 354.605 354.605"
          >
            <path
              id="XMLID_518_"
              d="M269.775,0H84.83L58.879,116.777v1.646c0,60.219,45.181,110.083,103.424,117.478v88.704h-35v30h100v-30h-35
	v-88.704c58.243-7.394,103.424-57.259,103.424-117.478v-1.646L269.775,0z M245.711,30l15.381,69.211H93.514L108.895,30H245.711z
	 M177.303,206.847c-45.105,0-82.427-33.949-87.766-77.636h175.532C259.729,172.898,222.408,206.847,177.303,206.847z"
            />
          </svg>
          <span>{fixDrinkBetween()}</span>
        </div>
      ) : (
        <div>-</div>
      )}

      <div className="wine-table-item-actions">
        <button onClick={handleEdit} className="button icon-only">
          <Edit size={20} />
        </button>
        <button
          disabled={wine.amount === 0}
          onClick={() => handleDrankClicked(wine._id)}
          className="button icon-only"
        >
          <Minus size={20} />
        </button>
        <button onClick={handleDelete} className="button icon-only delete">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default WineTableItem;

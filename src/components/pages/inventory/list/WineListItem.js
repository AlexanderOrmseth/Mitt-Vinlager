import { useState, useRef } from "react";
import {
  Star,
  Heart,
  Droplet,
  Calendar,
  MoreHorizontal as More,
  Edit3 as Edit,
  Trash2 as Trash,
  MinusCircle as Minus,
  X,
} from "react-feather";
import placeHolderWineSrc from "../../../../images/wine_placeholder.png";
import { useHistory } from "react-router-dom";
import WineScore from "../../../custom/WineScore";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { fixPrice, dateToString, sliceText } from "../../../functions/common";

const Wine = ({
  wine,
  handleDrankClicked,
  setDeleteModalData,
  setDeleteModal,
}) => {
  const wrapperRef = useRef(null);
  const history = useHistory();

  const [showOptions, setShowOptions] = useState(false);
  useOutsideClick(wrapperRef, () => setShowOptions(false));

  const fixDrinkBetween = () => {
    let start = wine.dates.drink_between_start;
    let end = wine.dates.drink_between_end;
    start ? (start = start.toString()) : (start = "?");
    end ? (end = end.toString()) : (end = "?");
    return `${start} - ${end}`;
  };

  // to view
  const handleClicked = () => history.push(`/wine/${wine._id}`);
  // to edit
  const handleEdit = () => history.push(`/wine/edit/${wine._id}`);
  // show delete modal
  const handleDelete = () => {
    setDeleteModal(true);
    setDeleteModalData({
      id: wine._id,
      name: wine.name,
      amount: wine.amount,
      year: wine.year,
    });
  };

  const handleShowOptions = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const prevent = (e) => {
    e.stopPropagation();
    setShowOptions(false);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={handleClicked}
      className={`wine ${wine.amount === 0 ? "wine-faded" : ""}`}
    >
      <header>
        <h3>{sliceText(wine.name, 20)}</h3>
        <button
          onClick={handleShowOptions}
          type="button"
          className="button icon-only"
        >
          {showOptions ? <X size={18} /> : <More size={18} />}
        </button>
      </header>
      <div className="content">
        {showOptions && (
          <div onClick={prevent} className="wine-item-options-wrap">
            <div className="wine-item-options-list">
              <button onClick={handleEdit} className="button icon">
                <Edit size={20} />
                Rediger
              </button>
              {wine.amount > 0 && (
                <button
                  onClick={() => handleDrankClicked(wine._id)}
                  className="button icon"
                >
                  <Minus size={20} />
                  Drukket
                </button>
              )}

              <button onClick={handleDelete} className="button icon delete">
                <Trash size={20} />
                Slett
              </button>
            </div>
          </div>
        )}
        <div className="type-wrap">
          <div className="type">
            {wine.year > 0 && <span>{wine.year}</span>}
            <p>{wine.type}</p>
            {wine.score && <WineScore value={wine.score} />}
          </div>

          {!!wine.origin.country_code && (
            <div
              className={`flag-icon flag-icon-${wine.origin.country_code}`}
            ></div>
          )}
        </div>

        <p className="price">{fixPrice(wine.price)}</p>

        <div className="wine-img">
          <img src={wine.image || placeHolderWineSrc} alt={wine.type} />
        </div>

        <div className="info-tags">
          <div className="info-tag">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
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
            <div className="popup">
              <span>Antall på lager</span>
            </div>
          </div>

          {wine.drank && wine.drank.length > 0 && (
            <div className="info-tag">
              <Calendar color="#232323" strokeWidth={2.2} size={16} />
              <span>{dateToString(new Date(wine.drank[0]), true, true)}</span>
              <div className="popup">
                <span>Sist drukket</span>
              </div>
            </div>
          )}
          {!!wine.rating && (
            <div className="info-tag">
              <Star color="#ffbe25" strokeWidth={2.2} size={18} />
              <span>{wine.rating / 2}</span>
              <div className="popup">
                <span>Din score</span>
              </div>
            </div>
          )}
          {wine.favorite && (
            <div className="info-tag">
              <Heart color="#ef233c" strokeWidth={2.2} size={16} />
              <div className="popup">
                <span>Favoritt</span>
              </div>
            </div>
          )}
          {wine.amount_left < 100 && (
            <div className="info-tag">
              <Droplet size={16} strokeWidth={2.2} />
              <span>{wine.amount_left}%</span>
              <div className="popup">
                <span>Flaskenivå</span>
              </div>
            </div>
          )}
          {(wine.dates.drink_between_start || wine.dates.drink_between_end) && (
            <div className="info-tag info-tag-drink-between">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
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
              <div className="popup">
                <span>Drikkes mellom</span>
              </div>
            </div>
          )}
        </div>
        <div className="origins">
          {wine.origin.country && (
            <p className="country">{wine.origin.country}</p>
          )}
          {wine.origin.region && <p>{wine.origin.region}</p>}
          {wine.origin.sub_region && <p>{wine.origin.sub_region}</p>}
        </div>
      </div>
    </div>
  );
};

export default Wine;

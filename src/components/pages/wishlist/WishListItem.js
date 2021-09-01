import Button from "../../custom/Button";
import { sliceText, dateToString } from "../../functions/common";
const WishListItem = ({ wishListItem, onDelete, isLoading, fnc }) => {
  return (
    <div className="wish-list-item">
      <div className="img-container">
        <img
          src={`https://bilder.vinmonopolet.no/cache/80x80-0/${wishListItem.productId}-1.jpg`}
          alt="Vin"
        />
      </div>
      <div className="wish-list-item-content">
        <div className="wish-list-item-title">
          <div
            className={`flag-icon flag-icon-${wishListItem.country_code}`}
          ></div>
          {sliceText(wishListItem.name, 40)}
        </div>

        <div className="wish-list-item-main-info">
          <p>{wishListItem.type}</p>
          <p>{wishListItem.year}</p>
          <p>{fnc.fixPrice(wishListItem.price)}</p>

          <p>{fnc.fixVolume(wishListItem.volume)}</p>
          <p>{wishListItem.alcohol_content}%</p>
        </div>

        <p className="wish-list-item-product-link">
          Varenummer:
          <a
            href={`https://www.vinmonopolet.no/p/${wishListItem.productId}`}
            target="_blank"
            rel="noreferrer"
          >
            {wishListItem.productId}
          </a>
        </p>
        <p>Lagt til: {dateToString(new Date(wishListItem.createdAt))}</p>
      </div>
      <Button
        isDelete
        onClick={() => onDelete(wishListItem._id)}
        isLoading={isLoading}
        text="Slett"
      />
    </div>
  );
};

export default WishListItem;

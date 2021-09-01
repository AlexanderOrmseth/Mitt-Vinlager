import { useEffect, useState } from "react";
import { getWishList } from "../../../actions/wishList";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

// CSS
import "./Wishlist.css";
import "../../../flags/flag.css";

// util
import placeholder from "../../../images/wine_placeholder.png";
import { fixPrice, fixVolume } from "../../functions/common";

// components
import VinmonopoletForm from "../../forms/vinmonopoletForm/VinmonopoletForm";
import Button from "../../custom/Button";
import FormBlockContent from "../../forms/FormBlockContent";
import WishListItem from "./WishListItem";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const [isLoading, setIsLoading] = useState(false);
  const [valuesFromVinmonopolet, setValuesFromVinmonopolet] = useState(null);

  useEffect(() => {
    if (!wishList) {
      dispatch(getWishList());
    }
    return () => {
      setIsLoading(false);
    };
  }, [wishList]);

  const addWineToWishList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/wishlist", {
        ...valuesFromVinmonopolet,
      });

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(getWishList());
        setValuesFromVinmonopolet(null);

        setIsLoading(false);
      }
    } catch (err) {
      if (err.response?.data?.msg) {
        toast.error(err.response.data.msg);
      } else {
        // no response = front-end error
        console.log("Error", err);
      }
      setIsLoading(false);
    }
  };

  const deleteWishListItem = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/wishlist/${id}`);

      if (res.data.success) {
        toast.success(res.data.msg);

        // get wine
        dispatch(getWishList());

        // redirect
        setIsLoading(false);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        console.log("Error", err);
      }

      setIsLoading(false);
    }
  };

  const vinmonopoletSubmit = (values) => {
    const { name, type, year, volume, price, alcohol_content, productId } =
      values;
    setValuesFromVinmonopolet({
      name,
      type,
      year,
      volume,
      price,
      alcohol_content,
      country: values.origin.country,
      productId,
    });
  };

  return (
    <div className="wishlist">
      <section className="form-header">
        <section className="form-info fff-block form-block cpd">
          <FormBlockContent title="Legg til i ønskelisten">
            <p>
              Bruk varenummer / link fra Vinmonopolet. Du kan maks ha 20 vin i
              ønskelisten.
            </p>
          </FormBlockContent>
        </section>
        <VinmonopoletForm
          withImg={false}
          vinmonopoletSubmit={vinmonopoletSubmit}
        />
      </section>

      <section className="wishlist-main-grid">
        <section className="wishlist-preview ">
          {!valuesFromVinmonopolet ? (
            <div className="fff-block cpd">
              <p>Forhåndsvisning</p>
            </div>
          ) : (
            <div className="wishlist-preview-container fff-block cpd">
              <h3 className="titleh3">{valuesFromVinmonopolet.name}</h3>
              <div className="wishlist-preview-info-grid">
                <p>{valuesFromVinmonopolet.type}</p>
                <p>{valuesFromVinmonopolet.year}</p>
                <p>{valuesFromVinmonopolet.country}</p>
                <p>{fixPrice(valuesFromVinmonopolet.price)}</p>
                <p>{valuesFromVinmonopolet.alcohol_content}%</p>
                <p>{fixVolume(valuesFromVinmonopolet.volume)}</p>
              </div>
              <div className="preview-img-container">
                <img
                  src={
                    valuesFromVinmonopolet.productId
                      ? `https://bilder.vinmonopolet.no/cache/760x760-0/${valuesFromVinmonopolet.productId}-1.jpg`
                      : placeholder
                  }
                  alt="Vin"
                />
              </div>
              <div className="wishlist-preview-actions">
                <Button
                  primary
                  onClick={addWineToWishList}
                  isLoading={isLoading}
                  text="Legg til i ønskelisten"
                />
              </div>
            </div>
          )}
        </section>
        <section className="cpd fff-block">
          <h3 className="titleh3">
            Ønskeliste
            <p>{wishList && ` ${wishList.length}/20`}</p>
          </h3>
          <div className="wish-list-item-container">
            {wishList && wishList.length === 0 && <p>Ønskelisten er tom</p>}
            {wishList &&
              wishList.map((item) => (
                <WishListItem
                  onDelete={deleteWishListItem}
                  key={item._id}
                  wishListItem={item}
                  fnc={{ fixPrice, fixVolume }}
                />
              ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default WishList;

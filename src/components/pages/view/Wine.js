import { useEffect, useState } from "react";
import placeHolderWineSrc from "../../../images/wine_placeholder.png";

import StarRatingReadOnly from "../../custom/StarRatingReadOnly";

import WineScore from "../../custom/WineScore";
import ImgZoom from "../../custom/ImgZoom";

import { fixPrice, dateToString, timeSince } from "../../functions/common";

// flag
import "../../../flags/flag.css";

import {
  Database,
  Info,
  Flag,
  Sliders,
  Heart,
  ExternalLink as Link,
  Edit3 as Edit,
  Trash2 as Trash,
  MinusCircle as Minus,
} from "react-feather";

import "./WineView.css";

const Wine = ({
  wine,
  setDrankModal,
  editWineLink,
  setDeleteModal,
  preview = false,
}) => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const sliders = wine.taste_description.slider_values;
    let fixSliders = [];
    for (const [key, value] of Object.entries(sliders)) {
      if (!value > 0) continue;
      let keyName = "";
      switch (key) {
        case "freshness":
          keyName = "Friskhet";
          break;
        case "fullness":
          keyName = "Fylde";
          break;
        case "bitterness":
          keyName = "Bitterhet";
          break;
        case "sweetness":
          keyName = "Sødme";
          break;
        case "tannins":
          keyName = "Tanninsk";
          break;
        default:
          continue;
      }
      fixSliders = [...fixSliders, { name: keyName, value: value }];
    }
    setSliders(fixSliders);
  }, [wine]);

  const volume = (v) => {
    let volume = parseFloat(v);

    if (volume > 0) {
      return `${volume * 100} cl`;
    }
    return "0 cl";
  };
  return (
    wine && (
      <div className="view-wine">
        <section className="view-wine-top">
          <header
            className={`fff-block ${
              preview ? "wine-header-full" : ""
            } view-wine-header cpd`}
          >
            <h1>
              {!!wine.origin.country_code && (
                <div
                  className={`flag-icon flag-icon-${wine.origin.country_code}`}
                ></div>
              )}
              {wine.name}
            </h1>
          </header>
          {!preview && (
            <aside className="cpd">
              <section className="view-wine-actions">
                <button className="button dark icon" onClick={editWineLink}>
                  <Edit size={18} />
                  Rediger
                </button>

                <button
                  className="button dark icon"
                  disabled={wine.amount <= 0}
                  onClick={() => setDrankModal(true)}
                >
                  <Minus size={18} />
                  Drukket
                </button>
                {wine.link && (
                  <a
                    className="button dark icon"
                    href={wine.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Link size={18} />
                    Link
                  </a>
                )}
                <button
                  className="button dark delete icon"
                  onClick={() => setDeleteModal(true)}
                >
                  <Trash size={18} />
                  Slett
                </button>
              </section>

              {(wine.score || wine.rating || wine.favorite) && (
                <section className="view-icons">
                  {wine.score && (
                    <div className="view-icon-wrap">
                      <WineScore dark value={wine.score} />
                    </div>
                  )}
                  {wine.rating > 0 && (
                    <div className="view-icon-wrap">
                      <StarRatingReadOnly value={wine.rating} />
                    </div>
                  )}
                  {wine.favorite && (
                    <div className="view-icon-wrap">
                      <Heart color="#ff4f65" strokeWidth={1.7} size={30} />
                    </div>
                  )}
                </section>
              )}
            </aside>
          )}
        </section>

        <section className="view-section-main cpd">
          <div>
            <section className="view-section">
              <h2>
                <Info size="18" />
                Om
              </h2>
              {wine.type && (
                <p>
                  <span>Type:</span> {wine.type}
                </p>
              )}

              {wine.year > 0 ? (
                <p>
                  <span>Årgang:</span> {wine.year}
                </p>
              ) : null}
              {wine.price > 0 ? (
                <p>
                  <span>Pris:</span> {fixPrice(wine.price)}
                </p>
              ) : null}
              {wine.alcohol_content > 0 ? (
                <p>
                  <span>Alkoholinnhold:</span> {wine.alcohol_content}%
                </p>
              ) : null}
              {wine.volume > 0 ? (
                <p>
                  <span>Volum:</span> {volume(wine.volume)}
                </p>
              ) : null}

              {wine.dates?.drink_between_start &&
              wine.dates?.drink_between_end ? (
                <p>
                  <span>Drikkes mellom:</span> {wine.dates.drink_between_start}{" "}
                  og {wine.dates.drink_between_end}
                </p>
              ) : null}
              {wine.storage_potential && (
                <p>
                  <span>Lagringsgrad:</span> {wine.storage_potential}
                </p>
              )}
              {wine.description && (
                <p>
                  <span>Notater:</span> {wine.description}
                </p>
              )}
              {wine.grapes && (
                <p>
                  <span>Råstoff:</span> {wine.grapes}
                </p>
              )}
            </section>

            <section className="view-section">
              <h2>
                <Flag size="18" />
                Opprinnelse
              </h2>
              {wine.origin.country && (
                <p>
                  <span>Land:</span> {wine.origin.country}
                </p>
              )}
              {wine.origin.region && (
                <p>
                  <span>Distrikt:</span> {wine.origin.region}
                </p>
              )}
              {wine.origin.sub_region && (
                <p>
                  <span>Underdistrikt:</span> {wine.origin.sub_region}
                </p>
              )}
              {wine.origin.manufacturer_name && (
                <p>
                  <span>Produsent:</span> {wine.origin.manufacturer_name}
                </p>
              )}
            </section>

            <section className="view-section view-section-taste">
              <h2>
                <Sliders size="18" />
                Smaksbeskrivelse
              </h2>
              <div>
                <div
                  className={`view-taste-description ${
                    sliders.length > 0 ? "" : "taste-description-span"
                  }`}
                >
                  {wine.taste_description.taste_notes && (
                    <p>
                      <span>Smaksnotater:</span>{" "}
                      {wine.taste_description.taste_notes}
                    </p>
                  )}
                  {wine.taste_description.taste && (
                    <p>
                      <span>Smak:</span> {wine.taste_description.taste}
                    </p>
                  )}
                  {wine.taste_description.color && (
                    <p>
                      <span>Farge:</span> {wine.taste_description.color}
                    </p>
                  )}
                  {wine.taste_description.odor && (
                    <p>
                      <span>Lukt:</span> {wine.taste_description.odor}
                    </p>
                  )}
                </div>
                {sliders.length > 0 ? (
                  <div className="view-taste-sliders">
                    {sliders.map((slider, i) => (
                      <div className="taste-slider" key={i}>
                        <h3>{slider.name}</h3>
                        <div>
                          <div className="slider-wrap">
                            <div
                              style={{
                                width:
                                  Math.round((slider.value * 100) / 12) + "%",
                              }}
                              className="slider-value"
                            ></div>
                          </div>
                          <p>{slider.value}/12</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
            <section className="view-section">
              <h2>
                <Database size="18" />
                Lager og status
              </h2>
              <p>
                <span>Antall på lager:</span> {wine.amount}
              </p>
              {wine.placement && (
                <p>
                  <span>Plassering:</span> {wine.placement}
                </p>
              )}
              {wine.amount_left < 100 && (
                <p>
                  <span>Flaskenivå:</span> {wine.amount_left}%
                </p>
              )}

              {wine.place_purchased && (
                <p>
                  <span>Kjøpested:</span> {wine.place_purchased}
                </p>
              )}
              {wine.dates?.purchased_date && (
                <p>
                  <span>Dato kjøpt:</span>{" "}
                  {dateToString(new Date(wine.dates.purchased_date))}
                </p>
              )}
            </section>
            {!preview ? (
              <section className="view-section">
                <h2>
                  <Edit size="18" />
                  Endringer
                </h2>

                <p>
                  <span>Sist endret:</span>{" "}
                  {wine.updatedAt !== wine.createdAt
                    ? `${timeSince(new Date(wine.updatedAt))} siden`
                    : " ingen endringer"}
                </p>
                {wine.createdAt && (
                  <p>
                    <span>Dato opprettet:</span>{" "}
                    {dateToString(new Date(wine.createdAt))}
                  </p>
                )}
              </section>
            ) : null}
          </div>
          <div>
            <ImgZoom
              productId={wine?.productId}
              src={wine.image || placeHolderWineSrc}
              alt={wine.type}
            />
          </div>
        </section>
      </div>
    )
  );
};

export default Wine;

import { useState } from "react";
import { Download } from "react-feather";
const ImgZoom = ({ src, productId, alt }) => {
  // credit to https://codepen.io/robertkirsz/pen/ZvorjB

  const [pos, setPos] = useState("0% 0%");
  const [imageSrc, setImageSrc] = useState(src);
  const [disabled, setDisabled] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPos(`${x}% ${y}%`);
  };

  const handleChangeImage = () => {
    if (productId) {
      setImageSrc(
        `https://bilder.vinmonopolet.no/cache/1200x1200-0/${productId}-1.jpg`
      );
    }
    setDisabled(true);
  };

  return (
    <>
      {productId && (
        <div className="view-image-action">
          <button
            disabled={disabled}
            className="button icon"
            onClick={handleChangeImage}
          >
            <Download size={18} />
            Hent 1200x1200
          </button>
        </div>
      )}
      <div
        className="view-image-container"
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: pos,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="view-image-content">
          <img src={imageSrc} alt={alt} />
        </div>
      </div>
    </>
  );
};

export default ImgZoom;

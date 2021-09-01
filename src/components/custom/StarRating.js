import { Star } from "react-feather";
const StarRating = ({ value, onChange, small = false }) => {
  const handleStarClicked = (index) =>
    index === value ? onChange(0) : onChange(index);
  return (
    <div className="star-rating-wrap">
      <div className={`star-rating ${small ? "small" : ""}`}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            onClick={() => handleStarClicked(i + 1)}
            className={`star ${i < value ? "star-active" : ""}`}
          >
            <Star strokeWidth={1.3} size={small ? 28 : 36} />
          </div>
        ))}
      </div>
      <div className="star-value">{value / 2}</div>
    </div>
  );
};
export default StarRating;

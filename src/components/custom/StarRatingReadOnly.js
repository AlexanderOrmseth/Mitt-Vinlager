import { Star } from "react-feather";
const StarRating = ({ value, small = false }) => {
  return (
    <div className="star-rating-wrap">
      <div className={`star-rating read-only ${small ? "small" : ""}`}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`star ${i < value ? "star-active" : ""}`}>
            <Star strokeWidth={1.3} size={small ? 28 : 36} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default StarRating;

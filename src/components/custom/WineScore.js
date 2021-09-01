const WineScore = ({ value = 50, dark = false }) => {
  const getScoreDefinition = () => {
    if (!isNaN(value) && value >= 50) {
      if (value >= 96) return `${value} (Spektakulær)`;
      if (value >= 93) return `${value} (Eksepsjonell)`;
      else if (value >= 90) return `${value} (Strålende)`;
      else if (value >= 87) return `${value} (Meget god)`;
      else if (value >= 84) return `${value} (God)`;
      else if (value >= 80) return `${value} (Gjennomsnittlig)`;
      else if (value >= 70) return `${value} (Akseptabel)`;
      else if (value >= 60) return `${value} (Dårlig)`;
      else if (value >= 50) return `${value} (Uakseptabel)`;
      else return "";
    }
    return "";
  };

  const degrees = (value - 50) * 3.6 - 90;
  const style = dark
    ? `linear-gradient(-90deg, #af0886 50%, transparent 50%), linear-gradient(${degrees}deg, #af0886 50%, #1c1d2a 50%)`
    : `linear-gradient(-90deg, #820263 50%, transparent 50%), linear-gradient(${degrees}deg, #820263 50%, #f1f1f1 50%)`;

  return (
    <div className={`${dark ? "dark" : ""} circle-score-wrap`}>
      <div style={{ backgroundImage: style }} className="circle-score-content">
        <div className="circle-score-center">
          <span className="circle-score-value">{value}</span>
        </div>
      </div>
      <div className="popup">
        <span>{getScoreDefinition()}</span>
      </div>
    </div>
  );
};

export default WineScore;

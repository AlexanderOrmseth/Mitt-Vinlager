export const fixPrice = (price) => {
  // UNDEFINED -> NULL -> NOT A NUMBER
  if (price == null || isNaN(price)) {
    return "0 kr";
  }

  let num = price;
  // is float
  if (Number(price) === price && price % 1 !== 0) {
    num = +(Math.round(price + "e+2") + "e-2");
    return (
      num
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " kr"
    );
  } else {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " kr";
  }
};

export const sliceText = (text, num) => {
  if (!text) return "";
  return text.length > num ? text.slice(0, num).trim() + "..." : text;
};

export const fixVolume = (v) => {
  let volume = parseFloat(v);

  if (volume > 0) {
    return `${volume * 100} cl`;
  }
  return "0 cl";
};

export const dateToString = (date, short = false, shortYear = false) => {
  const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (!date || typeof date.getMonth !== "function") {
    return "";
  }

  const month = short
    ? months[date.getMonth()].substring(0, 3)
    : months[date.getMonth()];

  let year = date.getFullYear();
  if (shortYear) {
    if (year === new Date().getFullYear()) {
      year = "";
    }
  }
  return `${date.getDate()}. ${month} ${year}`;
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " år";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " måned(er)";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " dag(er)";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " time(r)";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutt";
  return Math.floor(seconds) + " sekund";
};

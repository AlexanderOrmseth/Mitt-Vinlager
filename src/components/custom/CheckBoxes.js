const CheckBoxes = ({ options, setOptions, label }) => {
  const handleChecked = (option) => {
    let newOptions = [...options];
    // find index
    const indx = newOptions.findIndex((item) => item.name === option.name);
    newOptions[indx].selected = !newOptions[indx].selected;
    setOptions(newOptions);
  };

  return (
    <>
      <div className="checkboxes">
        <label className="label">
          {label} ({options.length})
        </label>
        <div className="checkboxes-options">
          {options &&
            options
              .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((option) => (
                <div
                  className="checkbox"
                  onClick={() => handleChecked(option)}
                  key={option.name}
                >
                  <div
                    className={`checkbox-icon ${
                      option.selected ? "checked" : ""
                    }`}
                  ></div>
                  <p className="checkbox-title">{option.name}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default CheckBoxes;

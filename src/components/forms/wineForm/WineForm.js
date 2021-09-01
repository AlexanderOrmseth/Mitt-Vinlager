import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// fluent ui
import { Slider } from "@fluentui/react";

// components
import VinmonopoletForm from "../vinmonopoletForm/VinmonopoletForm";
import WineFormSection from "./WineFormSection";
import StarRating from "../../custom/StarRating";
import YearPicker from "../../custom/YearPicker";
import DatePicker from "../../custom/DatePicker";
import Wine from "../../pages/view/Wine";
import TextField from "../../custom/TextField";
import TextArea from "../../custom/TextArea";
import Label from "../../custom/Label";
import Button from "../../custom/Button";
import { toast } from "react-hot-toast";

// icons
import {
  Camera as Image,
  Heart,
  Info,
  Flag,
  Sliders,
  File as Eye,
  Award,
  Trash2,
  PlusSquare as Plus,
  X,
  Save,
} from "react-feather";

// validation
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./yupValidationSchema";

// modal
import Modal from "react-modal";
Modal.setAppElement("#root");
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "100%",
    marginRight: "-50%",
    maxWidth: "1350px",
    maxHeight: "90vh", // might cause problems on some displays
    transform: "translate(-50%, -50%)",
    boxShadow:
      "0 1.6px 3.6px 0 rgb(0 0 0 / 10%), 0 0.3px 0.9px 0 rgb(0 0 0 / 22%)",
  },
};

const WineForm = ({
  submitValues,
  wineValues = false,
  openDeleteModal,
  isLoading = false,
  children,
}) => {
  // form validation rules
  const { handleSubmit, reset, control, errors, getValues } = useForm({
    resolver: yupResolver(validationSchema),
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    // adjusting values from server before applying them to the form
    // only when Editing (wineValues)
    if (wineValues) {
      const newValues = {
        // values from Form
        name: valueToString(wineValues.name),
        type: valueToString(wineValues.type),
        alcohol_content: valueToString(wineValues.alcohol_content),
        volume: valueToString(wineValues.volume),
        price: valueToString(wineValues.price),
        year: valueToString(wineValues.year),
        place_purchased: valueToString(wineValues.place_purchased),
        description: valueToString(wineValues.description),
        rating: wineValues.rating || 0,
        grapes: valueToString(wineValues.grapes),
        link: valueToString(wineValues.link),
        score: valueToString(wineValues.score),

        amount: valueToString(wineValues.amount),
        amount_left: wineValues.amount_left || 100,
        placement: valueToString(wineValues.placement),
        storage_potential: valueToString(wineValues.storage_potential),

        taste_description: {
          color: valueToString(wineValues.taste_description.color),
          taste: valueToString(wineValues.taste_description.taste),
          taste_notes: valueToString(wineValues.taste_description.taste_notes),
          odor: valueToString(wineValues.taste_description.odor),
          slider_values: {
            freshness: wineValues.taste_description.slider_values.freshness,
            fullness: wineValues.taste_description.slider_values.fullness,
            bitterness: wineValues.taste_description.slider_values.bitterness,
            sweetness: wineValues.taste_description.slider_values.sweetness,
            tannins: wineValues.taste_description.slider_values.tannins,
          },
        },
        dates: {
          // if date exists (stored as a string) convert it to a date
          purchased_date: wineValues.dates.purchased_date
            ? new Date(wineValues.dates.purchased_date)
            : null,
          drink_between_start: wineValues.dates.drink_between_start || null,
          drink_between_end: wineValues.dates.drink_between_end || null,
        },

        origin: {
          manufacturer_name: valueToString(wineValues.origin.manufacturer_name),
          country: valueToString(wineValues.origin.country),
          region: valueToString(wineValues.origin.region),
          sub_region: valueToString(wineValues.origin.sub_region),
        },
      };
      reset(newValues);
      setProductId(wineValues.productId);
      setBase64File(wineValues.image);
      setFavorite(wineValues.favorite);
    }
  }, [wineValues]);

  // modal state
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [previewWine, setPreviewWine] = useState(null);
  const [previewModelError, setPreviewModelError] = useState(null);
  const handleCloseModal = () => {
    setPreviewIsOpen(false);
  };

  // tab state
  const [tab, setTab] = useState(1);
  const [tabError, setTabErrors] = useState({});

  // favorite state
  const [favorite, setFavorite] = useState(false);

  // product id
  const [productId, setProductId] = useState(null);

  // img
  const [fileInputValue, setFileInputValue] = useState("");
  const [base64File, setBase64File] = useState("");
  const [imageSize, setImageSize] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const eFile = e.target.files[0];
    setFileInputValue(eFile); // maybe e.target.files
    const myFile = eFile;
    if (myFile) {
      const newFile = await toBase64(myFile);

      setBase64File(newFile);
    }
  };

  useEffect(() => {
    if (base64File.length > 0) {
      //console.log("MB: " + buffer.length / 1e6);
      const imgSize = base64File.length / 1e6;
      if (imgSize > 2.5) {
        toast("Bilde er muligens for stort");
        return setImageSize(
          `Bilde er for stort (${imgSize.toFixed(2)} MB), maks er 2.5 MB`
        );
      }
      setImageSize("~ " + imgSize.toFixed(4) + " MB");
    }
  }, [base64File]);
  // hidden fileInput trick
  const uploadImage = () => document.getElementById("input-file").click();

  // slider formats (Fluent UI sliders)
  const sliderPercentFormat = (value) => {
    if (value === 100) return "full";
    else if (value === 0) return "tom :(";
    return `${value}%`;
  };
  const sliderTasteFormat = (value) => (value === 0 ? "" : `${value}/12`);

  // null/undefined = "", int = toString
  const valueToString = (val) => {
    if (val == null) {
      // null and undefined
      return "";
    } else {
      // return value as string
      return isNaN(val) ? val : val.toString();
    }
  };

  // used for amount
  const toZeroValue = (value) => {
    if (value == null) {
      return 1;
    }
    let x = parseInt(value);
    if (x < 0) return 0;
    return x;
  };

  // fixing numbers
  const toNumber = (value, float = false) => {
    if (typeof value === "undefined") {
      return null;
    }

    // Check if number is too big?
    let number = float ? parseFloat(value, 2) : parseInt(value, 10);

    if (float) {
      number =
        number - Math.floor(number) !== 0
          ? parseFloat(number.toFixed(2))
          : number;
    }

    if (number < 0) return 0;
    return number === 0 ? number : number ? number : null;
  };

  const fixScore = (val, min, max) => {
    if (!val) return null;
    val = parseInt(val);
    if (isNaN(val) || val < min || val > max) {
      return null;
    }
    return val;
  };

  // fixing numbers before sending them to the server
  const correctFormValues = (values) => ({
    ...values,
    image: base64File,
    favorite,
    productId,
    score: fixScore(values.score, 50, 100),
    amount: toZeroValue(values.amount),
    price: toNumber(values.price, true),
    alcohol_content: toNumber(values.alcohol_content, true),
    volume: toNumber(values.volume, true),
    year: toNumber(values.year),
  });

  // show preview, send form values to preview
  const handlePreviewClick = async () => {
    const values = getValues();

    // validate values with the same yup schema
    try {
      await validationSchema.validate(values);
    } catch (error) {
      toast.error("Error, se over feltene.");
      setPreviewModelError(error?.message);
      return;
    } finally {
      // opens either way
      setPreviewIsOpen(true);
    }
    // adjust values 'as they would be on server
    setPreviewWine(correctFormValues(values));
  };

  // gets called when fetched values from api
  const resetForm = (values) => {
    reset(); // reset to empty
    reset(values); // reset into new values

    // not tracked by RHF
    setProductId(values.productId);
    setFavorite(false);
  };

  const onError = (errors) => {
    toast.error("Error, se over feltene.");

    const tbErr = [
      {
        errorCount: 0,
      },
      {
        errorCount: 0,
      },
      {
        errorCount: 0,
      },
      {
        errorCount: 0,
      },
    ];

    const tab1Fields = [
      "name",
      "type",
      "year",
      "alcohol_content",
      "volume",
      "price",
      "link",
      "grapes",
      "storage_potential",
      "amount",
      "placement",
      "place_purchased",
    ];
    const tab2Fields = ["country", "manufacturer_name", "region", "sub_region"];
    const tab3Fields = ["color", "taste", "taste_notes", "odor"];
    const tab4Fields = ["description", "score"];

    tbErr[0].errorCount =
      tab1Fields.filter((field) => field in errors).length || 0;

    if (errors?.origin) {
      tbErr[1].errorCount =
        tab2Fields.filter((field) => field in errors?.origin).length || 0;
    }

    if (errors?.taste_description) {
      tbErr[2].errorCount =
        tab3Fields.filter((field) => field in errors?.taste_description)
          .length || 0;
    }

    tbErr[3].errorCount =
      tab4Fields.filter((field) => field in errors).length || 0;

    // change tab to one with errors
    setTab(tbErr.indexOf(tbErr.find((item) => item.errorCount > 0) || 0) + 1);
    // display errors on tabs
    setTabErrors(tbErr);
  };

  // onSubmit is passed from parent
  const onSubmit = (data) => submitValues(correctFormValues(data));

  return (
    <div>
      {previewIsOpen && (
        <Modal
          isOpen={previewIsOpen}
          style={modalStyles}
          contentLabel="Forhåndsvisning"
          onRequestClose={handleCloseModal}
        >
          <div className="modal-title">
            <h2>Forhåndsvisning</h2>
            <button
              type="button"
              className="button icon"
              onClick={handleCloseModal}
            >
              <X size="15" />
              Lukk
            </button>
          </div>

          {!!previewWine ? (
            <Wine preview={true} wine={previewWine} />
          ) : (
            <p>{previewModelError}</p>
          )}
        </Modal>
      )}

      <section className="form-header">
        <section className="form-info fff-block form-block cpd">
          {children}
        </section>
        <VinmonopoletForm
          setFile={setBase64File}
          vinmonopoletSubmit={resetForm}
          widthImg={true}
        />
      </section>

      <form
        name="form-wine"
        autofill="false"
        className="form form-wine"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="tab-wrap">
          <div className="tab-panel">
            <div
              className={`${tab === 1 ? "active" : ""} tab`}
              onClick={() => setTab(1)}
            >
              <Info className="tab-icon" size={18} />
              <p>Om</p>
              {tabError[0]?.errorCount > 0 && (
                <span className="tab-error">{tabError[0].errorCount}</span>
              )}
            </div>
            <div
              className={`${tab === 2 ? "active" : ""} tab`}
              onClick={() => setTab(2)}
            >
              <Flag className="tab-icon" size={18} />
              <p>Opprinnelse</p>
              {tabError[1]?.errorCount > 0 && (
                <span className="tab-error">{tabError[1].errorCount}</span>
              )}
            </div>
            <div
              className={`${tab === 3 ? "active" : ""} tab`}
              onClick={() => setTab(3)}
            >
              <Sliders className="tab-icon" size={18} />
              <p>Smaksbeskrivelse</p>
              {tabError[2]?.errorCount > 0 && (
                <span className="tab-error">{tabError[2].errorCount}</span>
              )}
            </div>
            <div
              className={`${tab === 4 ? "active" : ""} tab`}
              onClick={() => setTab(4)}
            >
              <Award className="tab-icon" size={18} />
              <p>Vurdering</p>
              {tabError[3]?.errorCount > 0 && (
                <span className="tab-error">{tabError[3].errorCount}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-content cpd">
          <WineFormSection activeTab={tab === 1}>
            <div className="form-row">
              <div className="form-item">
                <Controller
                  control={control}
                  name="name"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      required
                      label="Navn på vin"
                      dark
                      errorMessage={errors.name?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>

              <div className="form-item">
                {false && (
                  <>
                    <input
                      className="input-file"
                      id="input-file"
                      accept="image/*"
                      type="file"
                      file={fileInputValue}
                      onChange={(e) => handleFileChange(e)}
                    />

                    <Label htmlFor="image" text="Velg bilde" />

                    <button
                      type="button"
                      className="button icon"
                      onClick={uploadImage}
                      name="image"
                    >
                      <Image size={18} />
                      Velg bilde
                    </button>
                  </>
                )}
                {base64File.length > 0 ? (
                  <div className="file-img-container">
                    <span>{imageSize}</span>
                    <img
                      className="file-img"
                      alt="selected-file"
                      src={base64File}
                    />
                  </div>
                ) : null}
              </div>

              <div className="form-item form-flex-2">
                <Controller
                  control={control}
                  name="type"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      label="Type"
                      dark
                      required
                      errorMessage={errors.type?.message}
                    />
                  )}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  name="year"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Årgang"
                      errorMessage={errors.year?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>

              <div className="form-item form-flex">
                <Controller
                  control={control}
                  name="alcohol_content"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Alkoholinnhold"
                      errorMessage={errors.alcohol_content?.message}
                    />
                  )}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  name="volume"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Volum (liter)"
                      errorMessage={errors.volume?.message}
                    />
                  )}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  name="price"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Pris"
                      errorMessage={errors.price?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Controller
                  control={control}
                  name="link"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Link"
                      errorMessage={errors.link?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="grapes"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      maxLength={150}
                      label="Råstoff"
                      errorMessage={errors.grapes?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="storage_potential"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Lagringsgrad"
                      errorMessage={errors.storage_potential?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>

              <div className="form-item form-flex">
                <Controller
                  control={control}
                  name="amount"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Antall"
                      errorMessage={errors.amount?.message}
                    />
                  )}
                  defaultValue="1"
                />
                <Controller
                  control={control}
                  name="placement"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      dark
                      name={name}
                      label="Plassering"
                      errorMessage={errors.placement?.message}
                    />
                  )}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  name="place_purchased"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Kjøpested"
                      errorMessage={errors.place_purchased?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item form-flex-2">
                <div>
                  <Label htmlFor={"dates.purchased_date"} text="Dato kjøpt" />
                  <Controller
                    control={control}
                    name="dates.purchased_date"
                    render={({ onChange, value }) => (
                      <DatePicker value={value} dark onChange={onChange} />
                    )}
                    defaultValue={null}
                  />
                </div>
                <div>
                  <Label
                    text="Drikkes mellom"
                    htmlFor="dates.drink_between_start"
                  />
                  <div className="form-item-drink-between">
                    <Controller
                      control={control}
                      name="dates.drink_between_start"
                      render={({ onChange, value }) => (
                        <YearPicker
                          value={value}
                          onChange={onChange}
                          text="Start-år"
                          dark
                        />
                      )}
                      defaultValue={null}
                    />
                    <span>-</span>
                    <Controller
                      control={control}
                      name="dates.drink_between_end"
                      render={({ onChange, value }) => (
                        <YearPicker
                          value={value}
                          onChange={onChange}
                          text="Slutt-år"
                          dark
                        />
                      )}
                      defaultValue={null}
                    />
                  </div>
                </div>
              </div>
              <div className="form-item">
                <Label text="Flaskenivå" htmlFor="amount_left" />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={100}
                      min={0}
                      step={25}
                      valueFormat={sliderPercentFormat}
                      showValue
                    />
                  }
                  name="amount_left"
                  defaultValue={100}
                />
              </div>
            </div>
          </WineFormSection>
          <WineFormSection activeTab={tab === 2}>
            <div className="form-row">
              <div className="form-item form-flex">
                <Controller
                  control={control}
                  name="origin.country"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      label="Land"
                      dark
                      errorMessage={errors.origin?.country?.message}
                    />
                  )}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  name="origin.region"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Distrikt"
                      errorMessage={errors.origin?.region?.message}
                    />
                  )}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  name="origin.sub_region"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Underdistrikt"
                      errorMessage={errors.origin?.sub_region?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Controller
                  control={control}
                  name="origin.manufacturer_name"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      dark
                      name={name}
                      label="Produsent"
                      errorMessage={errors.origin?.manufacturer_name?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
            </div>
          </WineFormSection>
          <WineFormSection activeTab={tab === 3}>
            <div className="form-row">
              <div className="form-item">
                <Controller
                  control={control}
                  name="taste_description.taste_notes"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      label="Smaksnotater"
                      maxLength={300}
                      dark
                      errorMessage={
                        errors.taste_description?.taste_notes?.message
                      }
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="taste_description.color"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Farge"
                      maxLength={100}
                      errorMessage={errors.taste_description?.color?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="taste_description.odor"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Lukt"
                      maxLength={100}
                      errorMessage={errors.taste_description?.odor?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="taste_description.taste"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Smak"
                      maxLength={200}
                      errorMessage={errors.taste_description?.taste?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-item">
                <Label
                  text="Ferskhet"
                  htmlFor="taste_description.slider_values.freshness"
                />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={12}
                      min={0}
                      step={1}
                      valueFormat={sliderTasteFormat}
                      showValue
                    />
                  }
                  name="taste_description.slider_values.freshness"
                  defaultValue={0}
                />
              </div>
              <div className="form-item">
                <Label
                  text="Fylde"
                  htmlFor="taste_description.slider_values.fullness"
                />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={12}
                      min={0}
                      step={1}
                      valueFormat={sliderTasteFormat}
                      showValue
                    />
                  }
                  name="taste_description.slider_values.fullness"
                  defaultValue={0}
                />
              </div>
              <div className="form-item">
                <Label
                  text="Bitterhet"
                  htmlFor="taste_description.slider_values.bitterness"
                />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={12}
                      min={0}
                      step={1}
                      valueFormat={sliderTasteFormat}
                      showValue
                    />
                  }
                  name="taste_description.slider_values.bitterness"
                  defaultValue={0}
                />
              </div>
              <div className="form-item">
                <Label
                  text="Sødme"
                  htmlFor="taste_description.slider_values.sweetness"
                />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={12}
                      min={0}
                      step={1}
                      valueFormat={sliderTasteFormat}
                      showValue
                    />
                  }
                  name="taste_description.slider_values.sweetness"
                  defaultValue={0}
                />
              </div>
              <div className="form-item">
                <Label
                  text="Tanninsk"
                  htmlFor="taste_description.slider_values.tannins"
                />
                <Controller
                  control={control}
                  as={
                    <Slider
                      max={12}
                      min={0}
                      step={1}
                      valueFormat={sliderTasteFormat}
                      showValue
                    />
                  }
                  name="taste_description.slider_values.tannins"
                  defaultValue={0}
                />
              </div>
            </div>
          </WineFormSection>
          <WineFormSection activeTab={tab === 4}>
            <div className="form-row">
              <div className="form-item form-flex-2">
                <Controller
                  control={control}
                  name="score"
                  render={({ onChange, name, value }) => (
                    <TextField
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Karakter (50-100)"
                      errorMessage={errors.score?.message}
                    />
                  )}
                  defaultValue=""
                />
                <div>
                  <Label htmlFor={"rating"} text="Stjerner" />
                  <Controller
                    control={control}
                    name="rating"
                    render={({ onChange, value }) => (
                      <StarRating value={value} onChange={onChange} />
                    )}
                    defaultValue={0}
                  />
                </div>
              </div>
              <div className="form-item">
                <Controller
                  control={control}
                  name="description"
                  render={({ onChange, name, value }) => (
                    <TextArea
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      name={name}
                      dark
                      label="Notater"
                      maxLength={750}
                      errorMessage={errors.description?.message}
                    />
                  )}
                  defaultValue=""
                />
              </div>
              <div className="form-item">
                <div>
                  <Label text={favorite ? `Favoritt (Ja)` : "Favoritt"} />
                  <button
                    type="button"
                    onClick={() => setFavorite(!favorite)}
                    className="button dark icon"
                  >
                    {favorite ? (
                      <>
                        <Heart color="#EF233C" size="18" />
                        Favoritt!
                      </>
                    ) : (
                      "Marker som favoritt"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </WineFormSection>
          <div className="form-actions">
            <Button
              primary
              type="submit"
              icon={wineValues ? <Save size="18" /> : <Plus size="18" />}
              isLoading={isLoading}
              text={wineValues ? "Lagre endringer" : "Legg til vin"}
            />
            <Button
              onClick={handlePreviewClick}
              icon={<Eye size={18} />}
              isLoading={isLoading}
              text="Forhåndsvis"
            />
            {wineValues && (
              <Button
                isDelete
                onClick={() => openDeleteModal(true)}
                icon={<Trash2 size={18} />}
                isLoading={isLoading}
                text="Slett"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default WineForm;

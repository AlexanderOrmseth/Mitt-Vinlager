import * as Yup from "yup";
// validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Navn på vin kan ikke være lengre enn 100 bokstaver")
    .required("Navn på vin er påkrevd"),
  description: Yup.string().max(
    750,
    "Notater kan ikke være lengre enn 750 bokstaver"
  ),
  place_purchased: Yup.string().max(
    50,
    "Kjøpested kan ikke være lengre enn 50 bokstaver"
  ),
  type: Yup.string()
    .max(50, "Vin type kan ikke være lengre enn 50 bokstaver")
    .required("Type er påkrevd"),
  storage_potential: Yup.string().max(
    50,
    "Lagringsgrad kan ikke være lengre enn 50 bokstaver"
  ),
  grapes: Yup.string().max(
    150,
    "Råstoff kan ikke være lengre enn 150 bokstaver"
  ),
  placement: Yup.string().max(
    50,
    "Plassering kan ikke være lengre enn 50 bokstaver/siffer"
  ),
  link: Yup.string().max(250, "Link ikke være lengre enn 250 bokstaver"),

  // taste
  taste_description: Yup.object().shape({
    taste: Yup.string().max(200, "Smak kan ikke være lengre enn 200 bokstaver"),
    color: Yup.string().max(
      100,
      "Farge kan ikke være lengre enn 100 bokstaver"
    ),
    odor: Yup.string().max(100, "Duft kan ikke være lengre enn 100 bokstaver"),
    taste_notes: Yup.string().max(
      300,
      "Smaksnotater kan ikke være lengre enn 300 bokstaver"
    ),
  }),
  // origin
  origin: Yup.object().shape({
    country: Yup.string().max(56, "Land kan ikke være lengre enn 56 bokstaver"),
    region: Yup.string().max(
      70,
      "Distrikt kan ikke være lengre enn 70 bokstaver"
    ),
    sub_region: Yup.string().max(
      70,
      "Underdistrikt kan ikke være lengre enn 70 bokstaver"
    ),
    manufacturer_name: Yup.string().max(
      100,
      "Produsent kan ikke være lengre enn 100 bokstaver"
    ),
  }),

  // number textFields
  price: Yup.string().max(
    7,
    "Pris kan ikke være lengre enn 7 bokstaver/siffer"
  ),
  year: Yup.string().max(
    5,
    "Årstall kan ikke være lengre enn 5 bokstaver/siffer"
  ),
  alcohol_content: Yup.string().max(
    7,
    "Alkoholinnhold kan ikke være lengre enn 7 bokstaver"
  ),
  score: Yup.string().max(
    3,
    "Karakter kan ikke være lengre enn 3 siffer (50-100)"
  ),
  volume: Yup.string().max(10, "Volum kan ikke være lengre enn 10 bokstaver"),
  amount: Yup.string().max(
    7,
    "Antall kan ikke være lengre enn 7 bokstaver/siffer"
  ),
});
export default validationSchema;

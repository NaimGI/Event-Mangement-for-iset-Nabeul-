import * as Yup from "yup";

export const checkoutSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  description: Yup.string().required("required"),
  MaxPer: Yup.number().required("required"),
  // DayStart: Yup.string().required("required"),
  //DayEnd: Yup.string().required("required"),
});

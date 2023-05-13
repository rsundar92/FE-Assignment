import { FormikErrors } from "formik";
import { ERROR_MESSAGE } from "../../appConstants";
import { TJob } from "../types";

export const validate = (values: TJob) => {
  const errors: FormikErrors<TJob> = {};
  if (!values.title) {
    errors.title = ERROR_MESSAGE.REQUIRED;
  }
  if (!values.companyName) {
    errors.companyName = ERROR_MESSAGE.REQUIRED;
  }
  if (!values.industry) {
    errors.industry = ERROR_MESSAGE.REQUIRED;
  }
  if (
    values.maxExperience &&
    values.minExperience &&
    values.maxExperience < values.minExperience
  ) {
    errors.minExperience =
      "Minimum experience should be less that Maximum experience";
  }

  if (
    values.maxSalary &&
    values.minSalary &&
    values.maxSalary < values.minSalary
  ) {
    errors.minExperience = "Minimum salary should be less that Maximum salary";
  }

  return errors;
};

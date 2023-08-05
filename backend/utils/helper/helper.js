import validator from "validator";
import { DateTime } from "luxon";
export const isValidTime = (time) => {
  // check[0] => hour  | check[1] => minute
  const check = time.split(":");
  if (!validator.isNumeric(check[0]) || !validator.isNumeric(check[1])) {
    return false;
  }

  if (check[0] > 24 || check[1] >= 60) {
    return false;
  }
  if (check[0] == 24 && (check[1] >= 0 || check[1] <= 0)) {
    return false;
  }
  if (check[0] < 0) {
    return false;
  }
  return true;
};

export const isValidDate = (date) => {
  if (!date) {
    return false;
  }
  const formats = ["yyyy-MM-dd", "dd/MM/yyyy", "yyyy/MM/dd", "dd-MM-yyyy"];

  let validDate = false;

  for (const format of formats) {
    const luxonDate = DateTime.fromFormat(date, format, { zone: "utc" });

    if (luxonDate.isValid) {
      validDate = luxonDate.toFormat("yyyy/MM/dd");
      break; // Stop if a valid format is found
    }
  }
  return validDate;
};

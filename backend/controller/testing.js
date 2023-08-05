import { DateTime } from "luxon";

// const dates = [
//   {
//     mdate: "2023-12-31T18:30:00.000Z",
//     mtime: "10:00",
//     _id: "64cdf69b26f5e37086f6704c",
//   },
//   {
//     mdate: "2024-01-31T18:30:00.000Z",
//     mtime: "10:00",
//     _id: "64cdf6a426f5e37086f67055",
//   },
//   {
//     mdate: "2024-02-29T18:30:00.000Z",
//     mtime: "10:00",
//     _id: "64cdf6ab26f5e37086f6705f",
//   },
// ];

// dates.map((datee) => {
//   let date = DateTime.fromISO(datee.mdate).toFormat("yyyy/MM/dd");
//   console.log(date);
// });

// udatee 2024/01/01   | data.mdate - 2024/01/01
let date_1 = "2024/01/01";
let date_2 = "2024/01/01";
if (date_1 == date_2) {
  console.log("True date");
} else {
  console.log("False date");
}

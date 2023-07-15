import DataUriParser from "datauri/parser.js";
import path from "path";

// - check if __dirname extra setup is required or not
const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  console.log(` Original name of the file =>   ${file.originalname}`);
  return parser.format(extName, file.buffer);
};

export default getDataUri;

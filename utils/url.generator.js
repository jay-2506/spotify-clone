import DatauriParser from "datauri/parser.js";
import path from "path"

const getDataurl = (file) => {
    const parser = new DatauriParser();
    const extension = path.extname(file.originalname).toString();
    return parser.format(extension, file.buffer);
}
export default getDataurl;
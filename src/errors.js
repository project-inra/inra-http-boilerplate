import errors, {defineError} from "inra-server-error";
import CustomError from "./api/errors/CustomError";


defineError({instance: CustomError}, "CustomError");

export default errors;

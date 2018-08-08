import errors, {defineError} from "inra-server-error";

import NoResultsFoundError from "./api/errors/NoResultsFoundError";
import NotAllowedError from "./api/errors/NotAllowedError";
import ParamNotProvidedError from "./api/errors/ParamNotProvidedError";

defineError({instance: NoResultsFoundError}, "NoResultsFoundError");
defineError({instance: NotAllowedError}, "NotAllowedError");
defineError({instance: ParamNotProvidedError}, "ParamNotProvidedError");

export default errors;

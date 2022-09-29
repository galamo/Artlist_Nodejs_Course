import uuidv4 from "uuid/v4";

export function loadRequestId(req, res, next) {
    const requestId = uuidv4();
    req.headers["x-request-id"] = requestId;
    next();
}
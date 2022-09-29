export function getRequestId(req) {
    return (
        (req.headers && req.headers["x-request-id"]) ||
        Date.now() + "-" + Math.floor(Math.random() * 1000)
    );
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.safeStringify = exports.getCorrelationId = exports.getQueueNameService = exports.appQueueName = void 0;
// @ts-ignore
var safe_json_stringify_1 = __importDefault(require("safe-json-stringify"));
// @ts-ignore
var appQueueName = function (pName) { return "PRODUCER-".concat(pName.toUpperCase(), "::").concat(Date.now()); };
exports.appQueueName = appQueueName;
// @ts-ignore
var getQueueNameService = function (service) {
    return "CONSUMER-".concat(service.toUpperCase());
};
exports.getQueueNameService = getQueueNameService;
var getCorrelationId = function (requestId) {
    return "".concat(requestId, "#").concat(Date.now());
};
exports.getCorrelationId = getCorrelationId;
function safeStringify(object) {
    var jsonString;
    try {
        jsonString = JSON.stringify(object);
    }
    catch (e) {
        jsonString = (0, safe_json_stringify_1["default"])(object);
    }
    return jsonString;
}
exports.safeStringify = safeStringify;

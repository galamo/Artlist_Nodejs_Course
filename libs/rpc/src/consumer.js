"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.startConsumer = void 0;
// @ts-ignore
var utils_1 = require("./utils");
// @ts-ignore
var channel_1 = require("./channel");
function startConsumer(_a) {
    var connectionPromise = _a.connectionPromise, service = _a.service, handlers = _a.handlers;
    return __awaiter(this, void 0, void 0, function () {
        var queueName, connection, channel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queueName = (0, utils_1.getQueueNameService)(service);
                    return [4 /*yield*/, connectionPromise];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, (0, channel_1.createChannel)({
                            connection: connection,
                            queueName: queueName,
                            options: { durable: false }
                        })];
                case 2:
                    channel = _b.sent();
                    channel.prefetch(1);
                    channel.consume(queueName, function (msg) {
                        return __awaiter(this, void 0, void 0, function () {
                            var payload, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payload = JSON.parse(msg.content.toString());
                                        console.log("######## ((2)) Consumer Recieved:".concat(queueName, " ").concat(JSON.stringify(payload)));
                                        console.log(handlers);
                                        if (typeof handlers[payload.handler] !== 'function') {
                                            channel.ack(msg);
                                            return [2 /*return*/];
                                        } // reply with error
                                        return [4 /*yield*/, handlers[payload.handler](payload.args, payload.requestId)];
                                    case 1:
                                        result = _a.sent();
                                        console.log("######## ((3)) Consumer Reply to Producer ".concat(msg.properties.replyTo, " Payload: ").concat(JSON.stringify(result)));
                                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ result: result, isError: payload.args === "send_error" })), {
                                            correlationId: msg.properties.correlationId
                                        });
                                        channel.ack(msg);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/, {
                            queueName: queueName
                        }];
            }
        });
    });
}
exports.startConsumer = startConsumer;

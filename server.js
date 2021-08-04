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
if (process.env.NODE_ENV !== 'PROD')
    require('dotenv').config();
var Discord = require('discord.js');
var CHAIN_GANG_CHANNEL_ID = '860809577595666432';
var TOKEN = process.env.TOKEN || "";
if (TOKEN === "")
    throw new Error("TOKEN env var not found");
var client = new Discord.Client();
function isChannelId(id) {
    return id == CHAIN_GANG_CHANNEL_ID;
}
var isMessageValid = function (currentMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var channel, res, lastMessage, lastEnteredNumber, currentEnteredNumber;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                channel = currentMessage.channel;
                return [4 /*yield*/, channel.messages.fetch({ limit: 2 })];
            case 1:
                res = _c.sent();
                lastMessage = res.last() || { content: "0", author: null };
                lastEnteredNumber = +lastMessage.content;
                if (isNaN(lastEnteredNumber))
                    return [2 /*return*/, Promise.resolve(false)];
                console.log('lastEnteredNumber inside isMessageValid ', lastEnteredNumber);
                currentEnteredNumber = +currentMessage.content;
                if (isNaN(currentEnteredNumber))
                    return [2 /*return*/, Promise.resolve(false)];
                if (!currentMessage.content.match(/^[1-9][0-9]*$/))
                    return [2 /*return*/, Promise.resolve(false)];
                if (!currentMessage.author)
                    return [2 /*return*/, Promise.resolve(false)];
                if (((_a = currentMessage.author) === null || _a === void 0 ? void 0 : _a.id) === ((_b = lastMessage.author) === null || _b === void 0 ? void 0 : _b.id))
                    return [2 /*return*/, Promise.resolve(false)];
                console.log('currentEnteredNumber inside isMessageValid ', currentEnteredNumber);
                return [2 /*return*/, currentEnteredNumber === lastEnteredNumber + 1];
        }
    });
}); };
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        console.info("Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) + "!");
        return [2 /*return*/];
    });
}); });
client.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!msg) {
                    console.log("on message handler had no message. this is an error.");
                    return [2 /*return*/];
                }
                if (!isChannelId(msg.channel.id)) return [3 /*break*/, 4];
                console.log('user input in the channel', msg.content);
                isValid = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 4]);
                return [4 /*yield*/, isMessageValid(msg)];
            case 2:
                isValid = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                if (!isValid)
                    msg["delete"]();
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.login(TOKEN);

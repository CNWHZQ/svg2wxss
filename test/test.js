"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var svg2wxss_1 = __importDefault(require("../lib/svg2wxss"));
var path_1 = __importDefault(require("path"));
svg2wxss_1.default({
    path: path_1.default.resolve("test/svgs"),
    out: {
        path: path_1.default.resolve("test/dist")
    }
}).then(function (_) {
    console.log("ok");
});

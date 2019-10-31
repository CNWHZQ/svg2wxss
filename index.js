"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var svg2wxss_1 = __importDefault(require("./lib/svg2wxss"));
function default_1(option) {
    var opt = { path: "" };
    if (typeof option == "string") {
        opt.path = option;
    }
    else {
        opt = option;
    }
    return svg2wxss_1.default(opt).then(function (_) {
        console.log("success");
    });
}
exports.default = default_1;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var art_template_1 = __importDefault(require("art-template"));
console.log(art_template_1.default);
var render = art_template_1.default.compile('hi, <%=value%>.', { escape: false });
console.log(render);
var html = render({ value: '"aui"' });
console.log(html);

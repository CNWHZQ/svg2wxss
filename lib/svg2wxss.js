"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var svg2css_1 = __importDefault(require("./svg2css"));
var art_template_1 = __importDefault(require("art-template"));
function converSVG(svgxml) {
    return svgxml
        .replace(/width="\S+"/, 'width="100%"')
        .replace(/height="\S+"/, 'height="100%"');
}
exports.converSVG = converSVG;
function setPreserveAspectRatio(svgxml) {
    return svgxml
        .replace('<svg', (svgxml.indexOf('preserveAspectRatio') > -1 ? '<svg' : '<svg preserveAspectRatio="none"'));
}
exports.setPreserveAspectRatio = setPreserveAspectRatio;
function default_1(opt) {
    var out = opt.out && opt.out.path ? opt.out.path : opt.path;
    return new Promise(function (resolve, reject) {
        glob(path.join(opt.path, "**/*.svg"), function (er, files) {
            if (er) {
                console.log(er.message);
                throw er;
            }
            var render = art_template_1.default.compile({
                filename: path.relative(__dirname, "../templates/svg.wxss.art"),
                escape: false
            });
            var HTMLrender = art_template_1.default.compile({
                filename: path.relative(__dirname, "../templates/index.html.art"),
                escape: false
            });
            var list = [];
            files.forEach(function (item) {
                var code = fs.readFileSync(item, 'utf-8');
                //不变形
                var code1 = converSVG(code);
                //变形
                var code2 = setPreserveAspectRatio(code1);
                code1 = svg2css_1.default(code1);
                code2 = svg2css_1.default(code2);
                var fname = path.parse(item).name.split("-");
                var mark = fname.length > 1 ? fname.slice(1).join("-") : fname.join("");
                /*
                list.push({
                    name:fname[0],
                    mark:mark,
                    backgroundImage:code1
                });
                */
                list.push({
                    name: fname[0],
                    mark: mark,
                    backgroundImage: code2
                });
            });
            var value = {
                files: list
            };
            var data = render(value);
            var html = HTMLrender(value);
            var pros = [];
            if (!(opt.out && (opt.out.html === false))) {
                pros.push(new Promise(function (resolve, reject) {
                    fs.writeFile(path.join(out, "index.html"), html, function (err) {
                        if (err)
                            throw err;
                        resolve();
                        console.log('index.html 已更新');
                    });
                }));
            }
            if (!(opt.out && (opt.out.css === false))) {
                pros.push(new Promise(function (resolve, reject) {
                    fs.writeFile(path.join(out, "svg.css"), data, function (err) {
                        if (err)
                            throw err;
                        resolve();
                        console.log('svg.css 已更新');
                    });
                }));
            }
            if (!(opt.out && (opt.out.wxss === false))) {
                pros.push(new Promise(function (resolve, reject) {
                    fs.writeFile(path.join(out, "svg.wxss"), data, function (err) {
                        if (err)
                            throw err;
                        resolve();
                        console.log('svg.wxss 已更新');
                    });
                }));
            }
            Promise.all(pros).then(resolve);
        });
    });
}
exports.default = default_1;

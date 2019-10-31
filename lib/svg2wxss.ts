import fs = require('fs');
import path = require('path');
import glob = require('glob');
import svg2css from './svg2css';
import template from "art-template";

export type option = {
    path:string,
    out?:{
        path?:string,
        css?:boolean,
        wxss?:boolean,
        html?:boolean
    }
}

export function converSVG (svgxml:string){
    return svgxml
    .replace(/width="\S+"/,'width="100%"')
    .replace(/height="\S+"/,'height="100%"')
}

export function setPreserveAspectRatio (svgxml:string){
    return svgxml
    .replace('<svg', (svgxml.indexOf('preserveAspectRatio')>-1 ? '<svg' : '<svg preserveAspectRatio="none"'))
}

export default function(opt:option){
    let out = opt.out && opt.out.path ? opt.out.path:opt.path;
    return new Promise((resolve,reject)=>{
        glob(path.join(opt.path,"**/*.svg"),function (er, files) {
            if(er){
                console.log(er.message);
                throw er;
            }

            
            var render = template.compile({
                filename:path.resolve("templates/svg.wxss.art"),
                escape: false
            } as any);
            var HTMLrender = template.compile({
                filename:path.resolve("templates/index.html.art"),
                escape: false
            } as any);

            let list:{name:string,mark:string,backgroundImage:string}[] = [];
            files.forEach(item=>{
                let code = fs.readFileSync(item,'utf-8');

                //不变形
                let code1 = converSVG(code);
                //变形
                let code2 = setPreserveAspectRatio(code1);

                code1 = svg2css(code1);
                code2 = svg2css(code2);
                let fname = path.parse(item).name.split("-")
                let mark = fname.length>1?fname.slice(1).join("-"):fname.join("");
                /*
                list.push({
                    name:fname[0],
                    mark:mark,
                    backgroundImage:code1
                });
                */
                list.push({
                    name:fname[0],
                    mark:mark,
                    backgroundImage:code2
                });
            })
            
            var value = {
                files:list
            };

            var data = render(value);

            var html = HTMLrender(value);
            
            let pros:Promise<any>[] = [];
            if(!(opt.out&&(opt.out.html===false))){
                pros.push(new Promise((resolve,reject)=>{
                    fs.writeFile(path.join(out,"index.html"), html, (err) => {
                        if (err) throw err;
                        resolve();
                        console.log('index.html 已更新');
                    });
                }))
            }
            if(!(opt.out&&(opt.out.css===false))){
                pros.push(new Promise((resolve,reject)=>{
                    fs.writeFile(path.join(out,"svg.css"), data, (err) => {
                        if (err) throw err;
                        resolve();
                        console.log('svg.css 已更新');
                    });
                }));
            }
            if(!(opt.out&&(opt.out.wxss===false))){
                pros.push(new Promise((resolve,reject)=>{
                    fs.writeFile(path.join(out,"svg.wxss"), data, (err) => {
                        if (err) throw err;
                        resolve();
                        console.log('svg.wxss 已更新');
                    });
                }));
            }
            Promise.all(pros).then(resolve);
        })
    });
}
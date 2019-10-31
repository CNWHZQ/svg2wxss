import svg2wxss from "../lib/svg2wxss"
import path from "path";
svg2wxss({
    path:path.resolve("test/svgs"),
    out:{
        path:path.resolve("test/dist")
    }
}).then(_=>{
    console.log("ok");
});
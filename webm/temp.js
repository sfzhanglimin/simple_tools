const child_process = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs");

// let inputDir = path.normalize(process.argv[2].trim());
// let outputDir;
// if (process.argv[3] == null || process.argv[3] == "") {
//     outputDir = inputDir
// } else {
//     outputDir = path.normalize(process.argv[3].trim())
// }

let inputDir = "D:\\work\\simple_tools\\webm\\split_cache"
let outputDir = "D:\\work\\simple_tools\\webm\\split_cache_alpha"

fs.readdir(inputDir, (e, files) => {
    if (e) throw e;
    for (let i = 0; i < files.length; i++) {
        const element = files[i];
        if (path.extname(element) == ".png" || path.extname(element) == ".jpg") {
            let idx = element.lastIndexOf("_");
            let filesnamePrefix = element.slice(0, idx + 1);

            //杂色处理
            const alpha = 200;

            let commandLine = `"D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe"`
            //ffmpeg -i in.png -vf format=yuva444p,geq='if(lte(alpha(X,Y),16),255,p(X,Y))':'if(lte(alpha(X,Y),16),128,p(X,Y))':'if(lte(alpha(X,Y),16),128,p(X,Y))' out.jpg
            commandLine += " -i \"" + path.resolve(inputDir, filesnamePrefix) + "%d.png\"";
            commandLine += ` -vf format=yuva420p,geq='if(lte(alpha(X,Y),${alpha}),255,p(X,Y))':'if(lte(alpha(X,Y),${alpha}),128,p(X,Y))':'if(lte(alpha(X,Y),${alpha}),128,p(X,Y))'`
            commandLine += " -y ";
            commandLine += `\"${path.resolve(outputDir, "t" + filesnamePrefix.slice(0, filesnamePrefix.length - 1) + "%d.png")}\"`;
            console.log(commandLine)
            child_process.exec( commandLine, (aE, aR) => {
                if (!!!aE) {
                    // let frameRate = 60;

                    // commandLine = "";
                    // commandLine += " -r " + frameRate;
                    // commandLine += " -i \"" + path.resolve(inputDir, "t" + filesnamePrefix) + "%d.jpg\"";
                    // commandLine += " -auto-alt-ref 0 ";
                    // commandLine += " -vcodec libvpx";
                    // commandLine += " -b 200k";
                    // commandLine += " -y ";
                    // commandLine += "\"" + path.resolve(outputDir, filesnamePrefix.slice(0, filesnamePrefix.length - 1) + ".webm\"");
                    // console.log(commandLine)
                    // child_process.exec(".\\ffmpeg.exe " + commandLine);
                }
                else {
                    console.log(aE)
                }
            });

            return;
        }
    }
})


const Path = require("path");
const FS = require("fs");
const PNG = require("pngjs").PNG;
const Sharp = require("sharp");
function scaleImage(image, premultiplied = false) {
    const buffer = FS.readFileSync(image);
    const img = PNG.sync.read(buffer);
    const pixels = img.data;
    const width = img.width;
    const height = img.height;
    const channel = 4;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let index = (row * width + col) * channel;
            let a = pixels[index + 3];

            a = a > 3 ? a / 255 : 1;

            pixels[index] /= a;
            pixels[index + 1] /= a;
            pixels[index + 2] /= a;
        }
    }

   
    
    const dir = Path.join(__dirname, "..", "cache", premultiplied ? "premultiplied" : "normal")

    if(!FS.existsSync(dir)){
        FS.mkdirSync(dir, { recursive: true })
    }

    const newFile = Path.join(dir, Path.basename(image))
    

    const newPng = new PNG({width: width, height: height})
    newPng.data = pixels;
    newPng.pack().pipe(FS.createWriteStream(newFile))

    
    
    


    // const item = Sharp(image);
    // item.png().toBuffer({ resolveWithObject: true }).then((aInfo) => {
    //     const dir = Path.join(__dirname, "..", "cache", premultiplied ? "premultiplied" : "normal")
    //     if (!FS.existsSync(dir)) {
    //         FS.mkdirSync(dir, { recursive: true })
    //     }

    //     const height = aInfo.info.height;
    //     const width = aInfo.info.width;

    //     let newItem = item;
    //     let channel = aInfo.info.channels

    //     if(premultiplied){
    //         let pixels = new Uint8Array(aInfo.data.buffer);
    //         for (let row = 0; row < height; row++) {
    //             for (let col = 0; col < width; col++) {
    //                 let index = (row * width + col) * channel;
    //                 let a = pixels[index + 3];

    //                 pixels[index] /= a;
    //                 pixels[index + 1] /= a;
    //                 pixels[index + 2] /= a;
    //             }
    //         }
    //         newItem = Sharp(pixels, { raw: { width: width, height: height, channels: channel } });
    //     }


    //     newItem.resize(Math.floor(width / 2), Math.floor(height / 2)).png().toFile(Path.join(dir, Path.basename(image)))
    // })

}

function run() {
    const dir = Path.join(__dirname, "..");
    const files = FS.readdirSync(dir);
    files.forEach(aFile => {
        if (Path.extname(aFile) === ".png") {
            scaleImage(Path.join(dir, aFile), true)
            scaleImage(Path.join(dir, aFile), false)
        }
    });
};

run()


module.exports = run
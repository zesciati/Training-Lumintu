import got from 'got';
import fs from 'fs';
import path from 'path';

const api = await fetch("http://192.168.18.67:8055/files");
const res = await api.json();
const content  = res.data;

const directory = "public/img/assets";

fs.readdir(directory, async(err, files) => {
    if (err) {
        throw err;
    }else {
        if(files.length>0){
            for(const file of files) {
                await fs.unlink(path.join(directory, file), (err2) => {
                    if (err2) {
                        throw err2;
                    }
                });
            }
            console.log(directory, "has been cleared");
        }

        if(content.length!==0){
            for (const item of content){
                const pathname = `${directory}/${item.id}.webp`;
                const file = fs.createWriteStream(pathname);
                const options = {
                    prefixUrl: "http://192.168.18.67:8055/assets",
                    url: item.id,
                    searchParams: {
                        format: "webp"
                    }
                };

                got.stream(options).pipe(file).on("close", () => {
                    console.log("finished creating", file.path);
                })
            }
        }
        //end of downloading
    }
});
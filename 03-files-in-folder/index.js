const { readdir } = require('fs/promises');
const path = require('path')
const fs = require('fs');
const { stdout } = process;

fs.lstat(path.join(__dirname, 'secret-folder', 'data.csv'), (err, stats) => {

    //Handle error

    return stats.isFile();
});

const informAboutNameExt = [];
let sizeOfFile;

(async function inform() {
    try {
        const files = await readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            informAboutNameExt.push(path.parse(path.join(__dirname, 'secret-folder', files[i].name)));
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                fs.stat(path.join(__dirname, 'secret-folder', files[i].name), function(err, stats) {
                    if (err) return console.log(err);
                    console.log(`${informAboutNameExt[i].name} - ${informAboutNameExt[i].ext.slice(1)} - ${stats.size/1000}kb`);
                })
            }
        }
    } catch (err) {
        console.error(err);
    }
})()
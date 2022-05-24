const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const { copyFile } = require('fs/promises');
const fsPromises = require("fs/promises");


//  MAIN CODE
fs.exists(path.join(__dirname, 'files-copy'), async function(isExist) {
    if (isExist) {
        const fileNamesOfCopyFolder = await readdir(path.join(__dirname, 'files-copy'))
        if (JSON.stringify(fileNamesOfCopyFolder) !== "[]") {
            for (let i = 0; i < fileNamesOfCopyFolder.length; i++) {
                await fsPromises.unlink(path.join(__dirname, 'files-copy', fileNamesOfCopyFolder[i]));
            }
        }
        const files = await readdir(path.join(__dirname, 'files'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]));
        }
    } else {
        fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        const files = await readdir(path.join(__dirname, 'files'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]));
        }
    }
});
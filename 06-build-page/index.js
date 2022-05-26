const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { copyFile } = require('fs/promises');
const fsPromises = require("fs/promises");

let contentOfTemplate = "";
let readStream = fs.createReadStream(path.join(__dirname, 'template.html'), "utf-8");


fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});


readStream.on('data', data => contentOfTemplate += data);
readStream.on('close', () => {
    let tags = Array.from(contentOfTemplate.match(/{{(\w+)}}/ig))
    tags.forEach((tag, index) => {

        let contentOfTag = '';
        let readStreamTag = fs.createReadStream(path.join(__dirname, 'components', `${tag.slice(2, tag.length-2)}.html`), "utf-8");
        readStreamTag.on('data', data => contentOfTag += data);
        readStreamTag.on('close', () => {
            contentOfTemplate = contentOfTemplate.replace(tag, contentOfTag);
            if (index == tags.length - 1) {
                fs.writeFile(
                    path.join(__dirname, 'project-dist', 'index.html'),
                    contentOfTemplate,
                    (err) => {
                        if (err) throw err;
                    }
                );
            }
        });
    })

});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {

        if (path.parse(path.join(__dirname, 'styles', file)).ext === ".css") {
            readStream = fs.createReadStream(path.join(__dirname, 'styles', file));
            readStream.on('data', chunk => {
                fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
                    chunk,
                    (err) => {
                        if (err) throw err;
                    }
                );
            })
        }
    })
})

let files;

fs.exists(path.join(__dirname, 'project-dist', 'assets'), async function(isExist) {
    if (isExist) {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'fonts'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'fonts', files[i]), path.join(__dirname, 'project-dist', 'assets', 'fonts', files[i]));
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'img'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'img', files[i]), path.join(__dirname, 'project-dist', 'assets', 'img', files[i]));
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'svg'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'svg', files[i]), path.join(__dirname, 'project-dist', 'assets', 'svg', files[i]));
        }
    } else {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'fonts'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'fonts', files[i]), path.join(__dirname, 'project-dist', 'assets', 'fonts', files[i]));
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'img'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'img', files[i]), path.join(__dirname, 'project-dist', 'assets', 'img', files[i]));
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        files = await readdir(path.join(__dirname, 'assets', 'svg'));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'assets', 'svg', files[i]), path.join(__dirname, 'project-dist', 'assets', 'svg', files[i]));
        }

    }
});
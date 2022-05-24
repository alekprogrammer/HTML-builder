const fs = require('fs');
const path = require('path');

let readStream;
fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {

        if (path.parse(path.join(__dirname, 'styles', file)).ext === ".css") {
            readStream = fs.createReadStream(path.join(__dirname, 'styles', file));
            readStream.on('data', chunk => {
                fs.appendFile(
                    path.join(__dirname, 'project-dist', 'bundle.css'),
                    chunk,
                    (err) => {
                        if (err) throw err;
                    }
                );
            })
        }
    })
})
const fs = require('fs');
const path = require('path')
const { stdin } = process;

fs.writeFile(
    path.join(__dirname, 'newtext.txt'),
    '',
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
);
console.log("Введите текст")


process.on('SIGINT', (charater, key) => {
    console.log("GOOOODbuy!")
    process.exit();
})
stdin.on('data', data => {
    if (data.toString().slice(0, data.toString().length - 2) === "exit") {
        console.log("GOOOODbuy!")
        process.exit();
    } else {
        fs.appendFile(
            path.join(__dirname, 'newtext.txt'),
            data,
            err => {
                if (err) throw err;
                console.log('Файл был изменен');
            }
        );
    }
});
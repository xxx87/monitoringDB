/*
* Модуль fs и его метод watchFile позволяет нам следить за изменениями файлов
* К примеру, если файл был изменён мы можем что-то сделать.
* В данном примере мы, при изменении файла tables.txt выполняем с помощью модуля shelljs
* команду pm2 restart index2.js, которая выполнить запуск\перезапуск файла index2.js
* с помощью модуля pm2
* */

const fs = require('fs');
const shell = require('shelljs');

const watchingFile = 'tables.txt';
console.log(__dirname);
console.log(`Watching for file changes on ${watchingFile}`);

fs.watchFile(watchingFile, (curr, prev) => {
	shell.exec('pm2 restart index2.js', function(code, output) {
		console.log('Exit code:', code);
		console.log('Program output:', output);
	});
});

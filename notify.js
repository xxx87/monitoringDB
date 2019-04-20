/*
* В данном примере мы подключаемся к БД постгресс для непрерывного наблюдения
* за изменениями в таблицах.
* Подключаем модуль pg-notify, который мониторит события Insert/Update/Delete
* в указанных таблицах.
* Таблици передаются модулю в виде массива.
* */

const {Client} = require('pg');
const fs = require('fs');
const pgNotify = require('@becual/pg-notify');
const conString = 'tcp://sky:passwOrd@localhost:5432/tmpsequelize';

let eventHandlerInsert = evt => {
	console.log('Insert: ', JSON.stringify(evt, null, 4));
};
let eventHandlerUpdate = evt => {
	console.log('Update: ', JSON.stringify(evt, null, 4));
};
let eventHandlerDelete = evt => {
	console.log('Delete: ', JSON.stringify(evt, null, 4));
};

(async () => {
	const client = new Client({connectionString: conString});
	const tables = ['tblexample', 't'];
	try {
		await client.connect();
		console.log('CONNECTION DONE to tblexample');
		const sub = await pgNotify(client, /*{schema: 'public'}*/).subscribe(tables);
		sub.on('INSERT', eventHandlerInsert);
		sub.on('UPDATE', eventHandlerUpdate);
		sub.on('DELETE', eventHandlerDelete);
	} catch (error) {
		console.log(error.message);
		await client.end();
	}

})();

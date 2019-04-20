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

// let content;
// content = fs.readFileSync('tables.txt');
// const tables = content.toString().split("\n").slice(0,-1);
// console.log(tables);

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

/*(async () => {
	// Use your connection string
	const client = new Client({connectionString: conString});

	// Choose your tables to listen
	// const tables = ['tblexample', 't'];

	try {
		// Connect client
		await client.connect();
		console.log('CONNECTION DONE');

		// By default schema is public
		const sub = await pgNotify(client, /!*{schema: 'public'}*!/).subscribe(tables);

		// Listen for changes
		sub.on('INSERT', eventHandlerInsert);
		sub.on('UPDATE', eventHandlerUpdate);
		sub.on('DELETE', eventHandlerDelete);
		return started
	} catch (error) {
		console.log(error.message);
		await client.end();
	}
})();*/

/*
// Блок обработки триггера в БД
const createSubscriber = require('pg-listen');
const cron = require('node-schedule');
const conString = 'tcp://sky:passwOrd@localhost:5432/tmpsequelize';
const subscriber = createSubscriber({ connectionString: conString });

subscriber.connect();
subscriber.listenTo("myEvent");
subscriber.notifications.on("myEvent", (payload) => {
	if(payload.key2 === 'new') check(payload);
});

function check(payload) {
	console.log('PAYLOAD: ', payload);
}

var rule = new cron.RecurrenceRule();
rule.second = 30;
cron.scheduleJob(rule, function(){
	// console.log(new Date(), 'The 30th second of the minute.');
});
*/

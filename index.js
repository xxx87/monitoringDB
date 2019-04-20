const {Client} = require('pg');
const fs = require('fs');
const pgNotify = require('@becual/pg-notify');
const conString = 'tcp://sky:passwOrd@localhost:5432/tmpsequelize';
var childProcess = require('child_process');
const shell = require('shelljs');

let eventHandlerInsert = evt => {
	console.log('Insert: ', JSON.stringify(evt, null, 4));
};
let eventHandlerUpdate = evt => {
	console.log('Update: ', JSON.stringify(evt, null, 4));
};
let eventHandlerDelete = evt => {
	console.log('Delete: ', JSON.stringify(evt, null, 4));
};

let content, cont;

const buttonPressesLogFile = 'tables.txt';
console.log(__dirname);
console.log(`Watching for file changes on ${buttonPressesLogFile}`);

function runScript(scriptPath, callback) {
	// keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;
	var process = childProcess.fork(scriptPath);
	// listen for errors as they may prevent the exit event from firing
	process.on('error', function (err) {
		if (invoked) return;
		invoked = true;
		callback(err);
	});
	// execute the callback once the process has finished running
	process.on('exit', function (code) {
		if (invoked) return;
		invoked = true;
		var err = code === 0 ? null : new Error('exit code ' + code);
		callback(err);
	});

}

fs.watchFile(buttonPressesLogFile, (curr, prev) => {
	// content = fs.readFileSync('tables.txt');
	// console.log(content.toString().split("\n").slice(0,-1));
	shell.exec('pm2 restart index2.js', function(code, output) {
		console.log('Exit code:', code);
		console.log('Program output:', output);
	});

});
/*
* , function(err, data) {
		if(err) throw err;
		content = data.toString().split("\n").slice(0,-1);
		console.log(content);
		// cont = content.toString().split("''")
		// console.log(cont);
	}*/
// fs.readFile('tables.txt', function(err, data) {
// 	if(err) {
// 		console.error(err);
// 	} else {
// 		tables = data.toString();
// 	}
// });
// console.log(tables);

// let myFunc = async () => {
// 	// Use your connection string
// 	const client = new Client({connectionString: conString});
// 	// Choose your tables to listen
// 	// const tables = ['tblexample', 't'];
// 	try {
// 		// Connect client
// 		await client.connect();
// 		console.log('CONNECTION DONE to T');
//
// 		// By default schema is public
// 		const sub = await pgNotify(client, /*{schema: 'public'}*/).subscribe(tables);
//
// 		// Listen for changes
// 		sub.on('INSERT', eventHandlerInsert);
// 		sub.on('UPDATE', eventHandlerUpdate);
// 		sub.on('DELETE', eventHandlerDelete);
//
//
// 	} catch (error) {
// 		console.log(error.message);
// 		await client.end();
// 	}
//
// };
// myFunc();

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

/*
* Блок обработки триггера в БД
* В БД создаётся триггер, в данном примере он имеет имя myEvent
* Тут с помощью модуля 'pg-listen' мы подписываемся на собития, которые генерит наш триггер*
*
* */
const createSubscriber = require('pg-listen');
// const cron = require('node-schedule');
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

// var rule = new cron.RecurrenceRule();
// rule.second = 30;
// cron.scheduleJob(rule, function(){
// 	// console.log(new Date(), 'The 30th second of the minute.');
// });

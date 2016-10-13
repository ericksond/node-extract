/**
 * Created by ericksond on 10/13/2016.
 */

var CronJob = require('cron').CronJob
    , request = require('request')
    , moment = require('moment')
    , fs = require('fs');

new CronJob('0 */5 * * * *', function() {
        fetchRESTData();
    }, function () {
    },
    true
);

function fetchRESTData() {
    request.get('http://domain/rest/api', {
        'auth': {
            'user': 'user',
            'password': 'password'
        }
    }, function(err, res, body) {
        if (err) {
            throw(err)
        }

        if(body) {
            const data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                const d = moment(new Date()).format('YYYYMMDDhmmss');
                renderJSON(data[i], 'rabbit.'+d+i)
            }
        }
    })
}

function renderJSON(data, fileName) {
    fs.writeFile(__dirname + '/json/'+fileName+'.json', JSON.stringify(data), function (err) {
        if (err) {
            throw err
        } else {
            console.log('successfully written JSON file: ' + fileName)
        }
    })
}
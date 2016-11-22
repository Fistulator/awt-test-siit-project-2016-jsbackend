// Require nodemailer for sending mails and jade for html templates
var nodemailer = require('nodemailer')
var jade = require('jade');
var config = require('./../../config/config');


function fillTemplate(event, appName){
    // Parameters for html
    var params = {
        date: event.time,
        version: event.versionNumber,
        appName: appName,
        stackTrace: event.stack,
        fragment: event.fragment
    };

    // Render html with specific params
    return jade.renderFile(config.mailTemplate, params);
}


exports.sendMail = function (users, appName, event) {
    // Fill template with specific params
    html = fillTemplate(event, appName);
    
    var transporter = nodemailer.createTransport(config.smtpConfig);

    var options = {
        from: config.smtpConfig.auth.user,
        to: users,
        subject: 'Error occurred',
        html: html,
        attachments: [{
            filename: 'stacktrace.txt',
            content: event.stack
        }]
    };
    

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log("Message not sent.");
        }
        else {
            console.log('Message sent: ' + info.response);
            console.log(info);
        };
    });
};
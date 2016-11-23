var port = 9000;

var smtpConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: 'bacovakuhinja@gmail.com',
            pass: 'jedanjebaco'
        }
    };

// Store PORT of server and DATABASE_PATH.
module.exports = {
    port: port,
    db: 'mongodb://localhost/jsBackend',
    secretKey: 'Stefan Lazarevic',
    smtpConfig: smtpConfig,
    mailTemplate: './templates/mail-template.jade'
};
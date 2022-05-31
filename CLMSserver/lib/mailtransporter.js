const nodemailer = require('nodemailer')
const mailer = nodemailer.createTransport({
    secure: false,
    auth: {
        user: 'test2lel.@dbztestingsmtp.lel',
        pass: 'Test2lel.'
    },
    tls: {
        rejectUnauthorized: false
    },
    requireTLS: false
})


module.exports = mailer
const sendEmail = require('./config/mailer');

sendEmail('recipient@example.com', 'Test Email', '<h1>Hello from Nodemailer!</h1>')
  .then(() => console.log('✅ Test email sent'))
  .catch((err) => console.error('❌ Error sending test email:', err));

import sendEmail from './app/services/send-mail-service.js';

const notifyUser = async () => {
    try {
        const email = 'mariano1941@outlook.es';
        const subject = 'Test Email';
        const message = 'This is a test email sent using Node.js.';

        if (!email || !subject || !message) {
            console.error('Email, subject, and message are required.');
            return;
        }

        await sendEmail(
            email,
            subject,
            message,
            `<p>${message}</p>`
        );

        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

notifyUser();

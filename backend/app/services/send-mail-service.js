import nodemailer from 'nodemailer';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.AWS_SMTP_HOST,
            port: process.env.AWS_SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.AWS_SMTP_USERNAME,
                pass: process.env.AWS_SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.AWS_SMTP_FROM_MAIL,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

export default sendEmail;
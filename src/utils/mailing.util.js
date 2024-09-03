import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD }
        })
        await transport.verify();
        await transport.sendMail({
            from: GOOGLE_EMAIL,
            to: data.to,
            subject: `USER REGISTERED!`,
            html: `
                <h1> WELCOME TO MANGAHAVEN </h1>
                <p> Verify Code: ${data.code} </p>
            `
        });
    } catch (error) {
        throw error;
    }
}

export default sendEmail;
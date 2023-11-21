import nodemailer = require("nodemailer");
import { Transporter } from "nodemailer";
export class EmailServiceProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: parseInt(process.env.PORT_EMAIL || "0", 10),
      secure: true,
      auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.PASSWD_INSTITUTIONAL_EMAIL, // generated ethereal password
      },
    });
  }

  public async sendEmail(
    recipients: string[],
    subject: string,
    body: string
  ): Promise<void> {
    const emailOptions = {
      from: process.env.INSTITUTIONAL_EMAIL,
      to: recipients.join(", "),
      subject: subject,
      text: body,
    };

    try {
      const info = await this.transporter.sendMail(emailOptions);
      console.log("Email enviado:", info.messageId);
      console.log(emailOptions.from);
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  }
}

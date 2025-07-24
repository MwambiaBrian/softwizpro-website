import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendActivationEmail(email: string, token: string) {
    const link = `http://localhost:5173/activate/${token}`;
    await this.transporter.sendMail({
      to: email,
      subject: 'Activate Your Account',
      html: `<p>Click <a href="${link}">here</a> to activate your account.</p>`,
    });
  }

  async sendResetEmail(email: string, token: string) {
    const link = `http://localhost:5173/reset-password/${token}`;
    await this.transporter.sendMail({
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });
  }
}

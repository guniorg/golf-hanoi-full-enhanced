// utils/sendEmail.ts
import nodemailer from 'nodemailer';

export async function sendConfirmationEmail({
  to,
  date,
  time,
  course,
  people,
}: {
  to: string;
  date: string;
  time: string;
  course: string;
  people: number;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🏌️‍♂️ 골프장 예약 확인',
    text: `예약이 완료되었습니다!\n\n
예약일: ${date}\n
예약시간: ${time}\n
골프장 코스: ${course}\n
인원 수: ${people}명\n\n
감사합니다!`,
  };

  await transporter.sendMail(mailOptions);
}


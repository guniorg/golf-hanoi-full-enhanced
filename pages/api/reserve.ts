import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// 이메일 발송기
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { date, course, teeTime, people, email, weather } = req.body;

      if (!date || !course || !teeTime || !people || !email) {
        return res.status(400).json({ success: false, error: '필수 값 누락' });
      }

      // Firestore 저장 데이터 구성
      const reservationData: Record<string, any> = {
        date,
        course,
        teeTime,
        people,
        email,
        createdAt: new Date(),
      };

      if (weather !== undefined && weather !== null) {
        reservationData.weather = weather;
      }

      await addDoc(collection(db, 'reservations'), reservationData);

      // 이메일 본문 HTML
      const emailHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#007bff">하노이 골프장 예약이 완료되었습니다! ⛳</h2>
          <p><strong>📅 날짜:</strong> ${date}</p>
          <p><strong>⛳ 골프장:</strong> ${course}</p>
          <p><strong>🕘 티업 시간:</strong> ${teeTime}</p>
          <p><strong>👥 인원:</strong> ${people}명</p>
          ${weather ? `<p><strong>🌤️ 예상 날씨:</strong> ${weather}</p>` : ''}
          <hr />
          <p style="font-size:12px;color:gray">Golf Hanoi 예약 시스템</p>
        </div>
      `;

      // 예약자 이메일 발송
      await transporter.sendMail({
        from: `"Golf Hanoi" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '⛳ 예약 완료 안내',
        html: emailHtml,
      });

      // 관리자 이메일 발송
      await transporter.sendMail({
        from: `"Golf Hanoi" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📌 [새 예약] ${date} / ${course} / ${teeTime}`,
        html: emailHtml,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('예약 또는 이메일 전송 오류:', error);
      res.status(500).json({ success: false, error: '예약 처리 실패' });
    }
  } else {
    res.status(405).json({ success: false, error: '허용되지 않은 요청 방식' });
  }
}
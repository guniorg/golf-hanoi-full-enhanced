'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AdminPage() {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const list = snapshot.docs.map((doc) => doc.data());
      setReservations(list);
    };
    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">예약 리스트</h1>
      <ul className="list-disc pl-6">
        {reservations.map((r, i) => (
          <li key={i}>{r.date} / {r.course} / {r.people}명</li>
        ))}
      </ul>
    </div>
  );
}

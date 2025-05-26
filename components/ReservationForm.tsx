'use client';
import { useState, useEffect } from 'react';
import { getWeather } from '@utils/getWeather';

const golfCourses: Record<string, string[]> = {
  'PHOENIX 골프장(화빈)': ['PHOENIX', 'DRAGON', 'CHAMPION'],
  'TAM DAO 골프장': ['ALL'],
  'BRG LEGEND HILL': ['ALL'],
  'DONG MO 골프장': ['ALL'],
  'SKYLAKE 골프장': ['SKY', 'LAKE'],
  'LONG BIEN 골프장': ['ALL'],
  'HILLTOP VALLEY': ['ALL'],
  'STONE VALLEY': ['ALL'],
  'VIN PEARL': ['ALL'],
  'DRAGON GOLF': ['ALL'],
};

const getPrice = (course: string, date: string) => {
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;
  const priceTable = {
    PHOENIX: { weekday: 2500000, weekend: 3800000 },
    DRAGON: { weekday: 2600000, weekend: 3875000 },
    CHAMPION: { weekday: 2800000, weekend: 4000000 },
  };
  return priceTable[course]?.[isWeekend ? 'weekend' : 'weekday'] || 0;
};

export default function ReservationForm() {
  const [date, setDate] = useState('');
  const [selectedGolfClub, setSelectedGolfClub] = useState('');
  const [course, setCourse] = useState('');
  const [teeTime, setTeeTime] = useState('');
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState('');
  const [weather, setWeather] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [successInfo, setSuccessInfo] = useState<any>(null);

  const teeTimes = ['06:30', '07:00', '07:30', '08:00', '09:00', '09:30', '10:00'];

  useEffect(() => {
    if (date) getWeather(date).then(setWeather);
  }, [date]);

  useEffect(() => {
    if (date && course) {
      setPrice(getPrice(course, date));
    }
  }, [date, course]);

  const handleSubmit = async () => {
    if (!date || !selectedGolfClub || !course || !teeTime || !people || !email) {
      return alert('모든 항목을 입력해 주세요.');
    }
    if (people < 1 || people > 4) {
      return alert('인원 수는 1명 이상 4명 이하로 입력해 주세요.');
    }

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, course, teeTime, people, email, weather }),
      });
      const result = await res.json();
      if (result.success) {
        setSuccessInfo({ date, course, teeTime, people, weather });
        setDate('');
        setSelectedGolfClub('');
        setCourse('');
        setTeeTime('');
        setPeople(1);
        setEmail('');
        setPrice(null);
        setWeather('');
      } else {
        alert('예약에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4 text-sm sm:text-base">
      <h1 className="text-2xl font-bold mb-4">🏌️ Hanoi Golf Reservation</h1>

      <div>
        <label className="font-semibold">📅 Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded mt-1" />
      </div>

      <div>
        <label className="font-semibold">⛳ Golf Club</label>
        <select
          value={selectedGolfClub}
          onChange={(e) => {
            setSelectedGolfClub(e.target.value);
            setCourse('');
          }}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">-- Select --</option>
          {Object.keys(golfCourses).map((club) => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold">📌 Golf Course</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          disabled={!selectedGolfClub}
        >
          <option value="">-- Select --</option>
          {selectedGolfClub && golfCourses[selectedGolfClub]?.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold">🕘 Tee Time</label>
        <select value={teeTime} onChange={(e) => setTeeTime(e.target.value)} className="w-full border p-2 rounded mt-1">
          <option value="">-- Select --</option>
          {teeTimes.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold">👥 People (max 4)</label>
        <input
          type="number"
          value={people}
          min={1}
          max={4}
          onChange={(e) => setPeople(Math.min(4, Math.max(1, Number(e.target.value))))}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      <div>
        <label className="font-semibold">📧 Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </div>

      {weather && <p>🌤️ 날씨: {weather}</p>}
      {price !== null && <p>💰 요금: {price.toLocaleString()} VND</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
      >
        예약하기
      </button>

      {successInfo && (
        <div className="mt-6 p-4 border rounded-md bg-green-50 text-sm">
          <h2 className="text-lg font-bold text-green-700 mb-2">✅ 예약이 완료되었습니다!</h2>
          <ul className="space-y-1">
            <li>📅 <strong>Date:</strong> {successInfo.date}</li>
            <li>🏌️ <strong>Golf Course:</strong> {successInfo.course}</li>
            <li>🕘 <strong>Tee Time:</strong> {successInfo.teeTime}</li>
            <li>👥 <strong>People:</strong> {successInfo.people}</li>
            <li>🌤️ <strong>Weather:</strong> {successInfo.weather || '날씨 정보 없음'}</li>
          </ul>
          <p className="mt-2 text-gray-600">📩 이메일로도 발송되었습니다.</p>
        </div>
      )}
    </div>
  );
}
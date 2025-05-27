'use client'
import { useState, useEffect } from 'react'
import { getWeather } from '../utils/getWeather'

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
}

const getPrice = (course: string, date: string) => {
  const day = new Date(date).getDay()
  const isWeekend = day === 0 || day === 6
  const priceTable = {
    PHOENIX: { weekday: 2500000, weekend: 3800000 },
    DRAGON: { weekday: 2600000, weekend: 3875000 },
    CHAMPION: { weekday: 2800000, weekend: 4000000 },
  }
  return priceTable[course]?.[isWeekend ? 'weekend' : 'weekday'] || 0
}

export default function ReservationForm() {
  const [date, setDate] = useState('')
  const [selectedGolfClub, setSelectedGolfClub] = useState('')
  const [course, setCourse] = useState('')
  const [teeTime, setTeeTime] = useState('')
  const [people, setPeople] = useState(1)
  const [email, setEmail] = useState('')
  const [weather, setWeather] = useState('')
  const [price, setPrice] = useState<number | null>(null)
  const [successInfo, setSuccessInfo] = useState<any>(null)

  const teeTimes = ['06:30', '07:00', '07:30', '08:00', '09:00', '09:30', '10:00']

  useEffect(() => {
    if (date) getWeather(date).then(setWeather)
  }, [date])

  useEffect(() => {
    if (date && course) {
      setPrice(getPrice(course, date))
    }
  }, [date, course])

  const handleSubmit = async () => {
    if (!date || !selectedGolfClub || !course || !teeTime || !people || !email) {
      return alert('모든 항목을 입력해 주세요.')
    }
    if (people < 1 || people > 4) {
      return alert('인원 수는 1명 이상 4명 이하로 입력해 주세요.')
    }

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, course, teeTime, people, email, weather }),
      })
      const result = await res.json()
      if (result.success) {
        setSuccessInfo({ date, course, teeTime, people, weather })
        setDate('')
        setSelectedGolfClub('')
        setCourse('')
        setTeeTime('')
        setPeople(1)
        setEmail('')
        setPrice(null)
        setWeather('')
      } else {
        alert('예약에 실패했습니다. 다시 시도해 주세요.')
      }
    } catch (error) {
      alert('에러 발생: ' + error)
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800 text-white px-4 py-10">
      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">⛳ Hanoi Golf Reservation</h1>
        <p className="text-center mb-6 text-sm sm:text-base">간편한 실시간 골프장 예약</p>

        <div className="text-sm sm:text-base space-y-4">
          <div>
            <label className="block mb-1">📅 날짜 선택 / Chọn ngày</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="text-black" />
          </div>
          <div>
            <label className="block mb-1">🏌️ 골프장 선택 / Chọn sân golf</label>
            <select value={selectedGolfClub} onChange={(e) => { setSelectedGolfClub(e.target.value); setCourse('') }} className="text-black">
              <option value="">-- 선택 --</option>
              {Object.keys(golfCourses).map((club) => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">📌 코스 선택 / Chọn loại sân</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} disabled={!selectedGolfClub} className="text-black">
              <option value="">-- 선택 --</option>
              {selectedGolfClub && golfCourses[selectedGolfClub]?.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">🕘 시간 선택 / Chọn thời gian</label>
            <select value={teeTime} onChange={(e) => setTeeTime(e.target.value)} className="text-black">
              <option value="">-- 선택 --</option>
              {teeTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">👥 플레이어 수 / Số người chơi</label>
            <input type="number" value={people} min={1} max={4} onChange={(e) => setPeople(Math.min(4, Math.max(1, Number(e.target.value))))} className="text-black" />
          </div>
          <div>
            <label className="block mb-1">📧 이메일 / Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black" required />
          </div>

          {weather && <p className="text-sm">🌤️ 날씨: {weather}</p>}
          {price !== null && <p className="text-sm">💰 요금: {price.toLocaleString()} VND</p>}

          <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded w-full mt-4 hover:bg-blue-700">예약 확인 / Xác nhận đặt</button>

          {successInfo && (
            <div className="mt-6 p-4 border rounded-md bg-green-50 text-green-800">
              <h2 className="text-lg font-bold mb-2">✅ 예약이 완료되었습니다!</h2>
              <ul>
                <li>📅 날짜: {successInfo.date}</li>
                <li>⛳ 골프장: {successInfo.course}</li>
                <li>🕘 시간: {successInfo.teeTime}</li>
                <li>👥 인원: {successInfo.people}</li>
                <li>🌤️ 날씨: {successInfo.weather || '정보 없음'}</li>
              </ul>
              <p className="mt-2 text-sm">📩 이메일로 확인 내용이 발송되었습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}





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
    <div className="main-background flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          ⛳ Hanoi Golf Reservation
        </h1>
        <p className="text-center text-white text-lg mb-6">
          간편한 실시간 골프장 예약
        </p>

        <div className="space-y-4">
          <label>📅 날짜 선택 / Chọn ngày</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>🏌️ 골프장 선택 / Chọn sân golf</label>
          <select
            value={selectedGolfClub}
            onChange={(e) => {
              setSelectedGolfClub(e.target.value)
              setCourse('')
            }}
          >
            <option value="">-- 선택 --</option>
            {Object.keys(golfCourses).map((club) => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>

          <label>📌 코스 선택 / Chọn loại sân</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            disabled={!selectedGolfClub}
          >
            <option value="">-- 선택 --</option>
            {selectedGolfClub && golfCourses[selectedGolfClub]?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>🕘 시간 선택 / Chọn thời gian</label>
          <select value={teeTime} onChange={(e) => setTeeTime(e.target.value)}>
            <option value="">-- 선택 --</option>
            {teeTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>

          <label>👥 플레이어 수 / Số người chơi</label>
          <input
            type="number"
            value={people}
            min={1}
            max={4}
            onChange={(e) => setPeople(Math.min(4, Math.max(1, Number(e.target.value))))}
          />

          <label>📧 이메일 / Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button onClick={handleSubmit}>
            예약 확인 / Xác nhận đặt
          </button>
        </div>

        {successInfo && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 text-black rounded-xl text-sm">
            <h2 className="text-lg font-bold text-green-700 mb-2">✅ 예약 완료!</h2>
            <ul className="space-y-1">
              <li>📅 날짜: {successInfo.date}</li>
              <li>🏌️ 코스: {successInfo.course}</li>
              <li>🕘 시간: {successInfo.teeTime}</li>
              <li>👥 인원: {successInfo.people}</li>
              <li>🌤️ 날씨: {successInfo.weather || '없음'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}






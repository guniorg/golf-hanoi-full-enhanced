// components/SplashScreen.tsx

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 text-white flex-col text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        ⛳ Hanoi Golf Reservation
      </h1>
      <p className="text-lg sm:text-xl font-medium">
        이보다 더 쉬울 수 없는 <br />
        하노이 골프장 예약
      </p>
    </div>
  );
}


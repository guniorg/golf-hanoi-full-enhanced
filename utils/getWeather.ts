export async function getWeather(date: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Hanoi,vn&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.list || !Array.isArray(data.list)) {
      return '날씨 정보 없음';
    }

    // 1. 해당 날짜 전체 예보 중간값 추출
    const sameDayItems = data.list.filter((item: any) =>
      item.dt_txt.startsWith(date)
    );

    const target = sameDayItems.length > 0
      ? sameDayItems[Math.floor(sameDayItems.length / 2)]
      : null;

    if (target) {
      const temp = Math.round(target.main.temp);
      const description = target.weather[0].description;
      return `날씨: ${description}, ${temp}°C`;
    } else {
      return '날씨 정보 없음';
    }
  } catch (error) {
    console.error('날씨 오류:', error);
    return '날씨 정보 없음';
  }
}





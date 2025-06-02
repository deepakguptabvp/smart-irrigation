// utils/irrigationLogic.js
export function getRecommendedIrrigation(week, rainForecast) {
  if (rainForecast > 0.5) return 'Do not irrigate';

  const schedule = {
    3: 1,
    4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2,
    14: 1.5,
  };

  return `${schedule[week] || 0} inches`;
}

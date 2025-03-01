// Get weather icon URL based on icon code
export function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }
  
  // Format date to display day, month, and date
  export function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }
  
  // Format time to display hour and AM/PM
  export function formatTime(date) {
    const options = { hour: "numeric", hour12: true }
    return date.toLocaleTimeString("en-US", options)
  }
  
  // Format day to display day name
  export function formatDay(date) {
    const options = { weekday: "short" }
    return date.toLocaleDateString("en-US", options)
  }
  
  
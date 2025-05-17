const config ={
    //AppScript endPOint for login/registration
    apiEndpoint:"https://script.google.com/macros/s/AKfycbxk_gnuR2AZ_LFFsXLM1J0RqUOhx8aetv4PcvwYP0NbffuHzjnFi7mO19OXGOdokq8/exec",
    
    rupeeSymbol : "₹",

    currentDateTime : formatDateGMT()
}

export default config;

function formatDateGMT() {
    const now = new Date();

    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
    const day = now.getDate();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    // Ensure leading zeros for single-digit values
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} GMT`;
    console.log('Formatted date:', formattedDate);
    return formattedDate;
  }
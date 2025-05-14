export default
{
    //AppScript endPOint for login/registration
    apiEndpoint:"https://script.google.com/macros/s/AKfycbwFT0fGE0uUCj7rewdNz93wecWQkSLBFpMOKObGdJbMIdLblU85rO9fOoaWpDP5jLI/exec",

    //project spi key
    projectApiKey:"AIzaSyA51my8-8HuxUL0MsR2yrSkgLWp07Y6vME",

    //Google Spreadsheet API endpoint
    spreadsheetId:"1QBmj2II7a1lYTM_NyzcL4p_wj6zQ--EPiYzND-eePPE",

    //Google Drive API folder ID
    folderId:"1SmH_rk87_5KSZaZd4n0b1CqIyzOaTBiL",

    currentDateTime : formatDateGMT()
}





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
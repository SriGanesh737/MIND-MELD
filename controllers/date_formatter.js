function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based, so we add 1
    let year = date.getFullYear();

    // Add leading zeroes if necessary
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    // Return the formatted date string
    return `${day}-${month}-${year}`;
}


module.exports = formatDate;
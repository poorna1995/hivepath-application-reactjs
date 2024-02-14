var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function getYears(startYear) {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    let incrementedYear = startYear++;
    years.push({ label: incrementedYear, value: incrementedYear });
  }
  return years;
}

export function getMonths() {
  return months.map((item, index) => {
    index = (index + 1 + "").length > 1 ? index + 1 + "" : "0" + (index + 1);
    return { label: item, value: index };
  });
}

export function getMonthName(index) {
  return months[parseInt(index - 1)];
}

export function getDateFormat(year, month) {
  let formattedDate = "";
  if (month && year) {
    formattedDate = year + "-" + month;
  }

  return formattedDate;
}

export function prettyDate(date) {
  let result = "";
  if (date != "") {
    const dateSplit = date.split("-");
    let monthName = getMonthName(dateSplit[1]);
    if (monthName.length > 4) {
      monthName = monthName.slice(0, 3);
    }
    return monthName + " " + dateSplit[0];
  }
  return result;
}

export function getDateConflict(start_date, end_date) {
  const startObj = new Date(start_date);
  const endObj = new Date(end_date);

  return startObj > endObj;
}

export function formatDate(date) {
  const datetoParse = new Date(date);
  const year = datetoParse.getFullYear();
  const month = (datetoParse.getMonth() + 1).toString().padStart(2, "0");
  const day = datetoParse.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

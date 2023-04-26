export function formatDate(date) {
    const datetoParse = new Date(date);
    const year = datetoParse.getFullYear();
    const month = (datetoParse.getMonth() + 1).toString().padStart(2, "0");
    const day = datetoParse.getDate().toString().padStart(2, "0");
    const hours = datetoParse.getHours().toString().padStart(2, "0");
    const minutes = datetoParse.getMinutes().toString().padStart(2, "0");
    const seconds = datetoParse.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}
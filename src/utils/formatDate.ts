export const formatDate = (dataString: string): string | null => {

  if (dataString.length !== 8 || isNaN(Number(dataString))) {
    console.error("Invalid date format. Use the format 'yyyymmdd'.");
    return null;
  }

  const year = dataString.slice(0, 4);
  const month = dataString.slice(4, 6);
  const day = dataString.slice(6);

  
  const date = new Date(`${year}-${month}-${day}`);

  // Checks if the date is valid (e.g. avoid invalid dates like 2023-02-30)
  if (isNaN(date.getTime())) {
    console.error("Invalid date");
    return null;
  }

  const formattedDate = date.toISOString();

  // Returns the formatted string (only the date part, no time)
  return formattedDate
}
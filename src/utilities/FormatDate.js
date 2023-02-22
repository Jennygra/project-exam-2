/**
 * Takes a date string and returns the formatted date string according to the specified options.
 * @param {string} dateString - The data string to format
 * @returns {string} The formatted date string
 */

function FormatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default FormatDate;

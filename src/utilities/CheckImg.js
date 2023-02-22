// This function check if the image (item) contains a valid image URL, if not it will return a default image
/**
 * Checks if "item" is null, undefined, an empty string or the strin "null". If any of the conditions are true, it returns the "fallbackImageUrl". If false it returns "item".
 * @param {string | null | undefined} item - The item to check
 * @param {string} fallbackImageUrl - The fallback image URL to return if "item" is null, undefined, an empty array or the string "null".
 * @returns {string} either "item" or "fallbackImageUrl"
 */

function checkImg(item, fallbackImageUrl) {
  if (item === "null" || item === null || item === "" || item === undefined) {
    return fallbackImageUrl;
  } else {
    return item;
  }
}

export default checkImg;

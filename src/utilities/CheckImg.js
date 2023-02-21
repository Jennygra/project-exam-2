// This function check if the image (item) contains a valid image URL, if not it will return a default image

function checkImg(item, defaultImg) {
  if (item === "null" || item === null || item === "" || item === undefined) {
    return defaultImg;
  } else {
    return item;
  }
}

export default checkImg;

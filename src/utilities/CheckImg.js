// This function check if the image (item) contains a valid image URL, if not it will return a default image

function checkImg(item, fallbackImageUrl) {
  if (item === "null" || item === null || item === "" || item === undefined) {
    return fallbackImageUrl;
  } else {
    return item;
  }
}

export default checkImg;

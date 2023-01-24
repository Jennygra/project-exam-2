function checkImg(item, defaultImg) {
  if (item === "null" || item === null || item === "") {
    return defaultImg;
  } else {
    return item;
  }
}

export default checkImg;

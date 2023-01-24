function checkImg(item, defaultImg) {
  if (item === "null" || item === null || item === "" || item === undefined) {
    return defaultImg;
  } else {
    return item;
  }
}

export default checkImg;

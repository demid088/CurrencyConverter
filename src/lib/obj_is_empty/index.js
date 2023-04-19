function ObjIsEmpty(obj) {
  for (let key in obj) {
    return false
  }
  return true
}

export default ObjIsEmpty
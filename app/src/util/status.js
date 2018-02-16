export default (stat, data) => {
  return {
    data,
    isGood: () => stat,
    isBad: () => !stat
  }
}

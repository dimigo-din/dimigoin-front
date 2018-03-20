export default Vue => {
  // pretty print meal information
  Vue.filter('prettyMeal', val => {
    const str = (val || '').replace(/ ?\/ ?/g, ' | ')
    return (!str || str === 'X') ? '급식 정보가 없습니다.' : str
  })
}

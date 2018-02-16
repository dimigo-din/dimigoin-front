export default token => JSON.parse(window.atob(token.split('.')[1]))

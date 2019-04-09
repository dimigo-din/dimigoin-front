import { setHours, setMinutes } from 'date-fns'
const splitTime = time => time.split(':').map(v => parseInt(v, 10))
const setHoursAndMinutes = (date, ...times) => setMinutes(setHours(date, times[0]), times[1])
const setTime = date => time => setHoursAndMinutes(date, ...splitTime(time))
export default setTime

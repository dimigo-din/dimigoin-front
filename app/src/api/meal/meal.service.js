import { ServiceBase } from '@/src/api/service-base'
import { format } from 'date-fns'

export class MealService extends ServiceBase {
  getTodayMeal () {
    return this.getMeal(new Date())
  }

  isTomorrow (date = new Date()) {
    const endDate = new Date()
    endDate.setHours(19, 20)
    return date > endDate
  }

  async getMeal (date) {
    const formattedDate = format(date, 'YYYY-MM-DD')

    return (await this.magician(
      () => this.r.get(`/${formattedDate}`),
      {
        404: () => ({
          breakfast: '',
          lunch: '',
          dinner: '',
          date: formattedDate
        })
      }
    )).data
  }
}

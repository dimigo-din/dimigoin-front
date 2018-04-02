import { superstruct } from 'superstruct'
import moment from 'moment'

const struct = superstruct({
  types: {
    moment: moment.isMoment
  }
})

const _Assignment = struct({
  idx: 'number',
  title: 'string',
  description: 'string',
  deadline: 'date',
  targetGrade: 'number',
  targetClass: 'number',
  assignor: struct({
    name: 'string',
    email: 'string'
  }),
  reports: [struct({
    author: struct({
      name: 'string',
      studentSerial: 'string'
    }),
    uploadedDate: 'moment',
    fileName: 'string'
  })]
})

export const Assignment = assignment => _Assignment({
  idx: assignment['idx'],
  title: assignment['title'],
  description: assignment['deadline'],
  targetGrade: assignment['target_grade'],
  targetClass: assignment['target_class'],
  assignor: assignment['assignor'],
  reports: assignment['reports'].map(v => ({
    author: {
      name: v['author']['name'],
      studentSerial: v['author']['student_serial']
    },
    uploadedDate: moment(v['uploaded_date']),
    fileName: v['file_name']
  }))
})

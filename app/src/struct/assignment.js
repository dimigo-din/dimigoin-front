import { superstruct } from 'superstruct'
import moment from 'moment'

const struct = superstruct({
  types: {
    moment: moment.isMoment
  }
})

const _Author = struct.interface({
  name: 'string',
  studentSerial: 'string'
})

const _Report = struct.interface({
  author: _Author,
  uploadedDate: 'moment',
  fileName: 'string'
})

const _Assignor = struct.interface({
  name: 'string',
  email: 'string'
})

const _Assignment = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  deadline: 'moment',
  targetGrade: 'number',
  targetClass: 'number',
  assignor: _Assignor,
  reports: struct.union([[_Report], 'undefined', 'null']),
  report: struct.union([_Report, 'undefined', 'null'])
})

const convertReport = v => (v && {
  author: {
    name: v['author']['name'],
    studentSerial: v['author']['student_serial']
  },
  uploadedDate: moment(v['uploaded_date']),
  fileName: v['file_name']
})

export const Assignment = assignment => _Assignment({
  idx: assignment['idx'],
  title: assignment['title'],
  deadline: moment(assignment['deadline']),
  description: assignment['deadline'],
  targetGrade: assignment['target_grade'],
  targetClass: assignment['target_class'],
  assignor: assignment['assignor'],
  reports: (assignment['reports'] || []).map(convertReport),
  report: convertReport(assignment['report'])
})

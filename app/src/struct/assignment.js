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

/**
 * const _Assignment = struct.interface({
 *  idx: 'number',
 *  title: 'string',
 *  description: 'string',
 *  end_date: 'moment',
 *  targetGrade: 'number',
 *  targetClass: 'number',
 *  assignor: _Assignor,
 *  report: _Report
 * })
 */

const _Assignments = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  end_date: 'moment',
  targetGrade: 'number',
  targetClass: 'number',
  assignor: _Assignor,
  reports: [_Report]
})

const convertReport = v => (v && {
  author: {
    name: v['author']['name'],
    studentSerial: v['author']['student_serial']
  },
  uploadedDate: moment(v['uploaded_date']),
  fileName: v['file_name']
})

/**
 * export const Assignment = assignment => _Assignment({
 *  idx: assignment['idx'],
 *  title: assignment['title'],
 *  description: assignment['description'],
 *  end_date: moment(assignment['end_date']),
 *  targetGrade: assignment['target_grade'],
 *  targetClass: assignment['target_class'],
 *  assignor: assignment['assignor'],
 *  report: convertReport(assignment['report'] || [])
 * })
 */

export const Assignments = assignment => _Assignments({
  idx: assignment['idx'],
  title: assignment['title'],
  description: assignment['description'],
  end_date: moment(assignment['end_date']),
  targetGrade: assignment['target_grade'],
  targetClass: assignment['target_class'],
  assignor: assignment['assignor'],
  reports: (assignment['reports'] || []).map(convertReport)
})

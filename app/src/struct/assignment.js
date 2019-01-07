import moment from 'moment'

const convertReport = v => (v && {
  author: {
    name: v['author']['name'],
    studentSerial: v['author']['student_serial']
  },
  uploadedDate: moment(v['uploaded_date']),
  fileName: v['file_name']
})

export const Assignments = assignment => ({
  idx: assignment['idx'],
  title: assignment['title'],
  description: assignment['description'],
  end_date: moment(assignment['end_date']),
  targetGrade: assignment['target_grade'],
  targetClass: assignment['target_class'],
  assignor: assignment['assignor'],
  reports: (assignment['reports'] || []).map(convertReport)
})

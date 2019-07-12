import timestamp from 'unix-timestamp'

export const Assignment = assignment => ({
  idx: assignment['idx'],
  title: assignment['title'],
  description: assignment['description'],
  endDate: timestamp.toDate(assignment['end_date']),
  targetGrade: assignment['target_grade'],
  targetClass: assignment['target_class'],
  assignor: assignment['assignor'],
  report: assignment['report']
})

export const CreateAssignmentInput = assignment => ({
  'title': assignment.title,
  'description': assignment.description,
  'end_date': timestamp.fromDate(assignment.endDate),
  'target_grade': assignment.targetGrade,
  'target_class': assignment.targetClass
})

export const EditAssignmentInput = assignment => ({
  'title': assignment.title,
  'description': assignment.description,
  'end_date': timestamp.fromDate(assignment.endDate),
  'target_grade': assignment.targetGrade,
  'target_class': assignment.targetClass
})

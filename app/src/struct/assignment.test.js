import { Assignment } from './assignment'

const admin = {
  '/assignments/': {
    'assignments': [
      {
        'idx': 0,
        'title': 'string',
        'description': 'string',
        'deadline': '2018-05-06T05:33:20.808Z',
        'target_grade': 0,
        'target_class': 0,
        'assignor': {
          'name': 'string',
          'email': 'string'
        },
        'reports': [
          {
            'author': {
              'name': 'string',
              'student_serial': 'string'
            },
            'uploaded_date': '2018-05-06T05:33:20.808Z',
            'file_name': 'string'
          }
        ]
      }
    ]
  }
}

const assignee = {
  '/assignments/assignee': {
    'assignments': [
      {
        'idx': 0,
        'title': 'string',
        'description': 'string',
        'deadline': '2018-05-06T05:33:20.852Z',
        'target_grade': 0,
        'target_class': 0,
        'assignor': {
          'name': 'string',
          'email': 'string'
        },
        'report': {
          'author': {
            'name': 'string',
            'student_serial': 'string'
          },
          'uploaded_date': '2018-05-06T05:33:20.852Z',
          'file_name': 'string'
        }
      }
    ]
  }
}

console.log(admin['/assignments/']['assignments'].map(Assignment))
console.log(assignee['/assignments/assignee']['assignments'].map(Assignment))

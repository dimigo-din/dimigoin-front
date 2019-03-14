class ManagementService {
  name = ''
  title = ''
  to = ''
  constructor (name, title, to) {
    this.name = name
    this.title = title
    this.to = 'management/' + to
  }
}

export default {
  'afterschool': new ManagementService('afterschool', '방과후신청 관리', 'afterschool'),
  'ingang': new ManagementService('ingang', '인강실 관리', 'ingang'),
  'dets': new ManagementService('dets', '뎃츠 관리', 'dets'),
  'notice': new ManagementService('notice', '공지사항 관리', 'announcement'),
  'counsel': new ManagementService('counsel', '상담실 관리', 'counsel'),
  'book': new ManagementService('book', '도서 신청 관리', 'book'),
  'assignment_master': new ManagementService('assignment_master', '과제 관리', 'assignment'),
  'circle': new ManagementService('circle', '동아리 신청 관리', 'circle'),
  'freshman_admin': new ManagementService('freshman_admin', '신입생 공지 관리', 'freshman')
}

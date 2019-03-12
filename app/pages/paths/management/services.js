class ManagementService {
  title = ''
  to = ''
  constructor (title, to) {
    this.title = title
    this.to = 'management/' + to
  }
}

export default {
  'afterschool': new ManagementService('방과후신청 관리', 'afterschool'),
  'ingang': new ManagementService('인강실 관리', 'ingang'),
  'dets': new ManagementService('뎃츠 관리', 'dets'),
  'notice': new ManagementService('공지사항 관리', 'announcement'),
  'counsel': new ManagementService('상담실 관리', 'counsel'),
  'book': new ManagementService('도서 신청 관리', 'book'),
  'assignment_master': new ManagementService('과제 관리', 'assignment'),
  'circle': new ManagementService('동아리 신청 관리', 'circle'),
  'freshman_admin': new ManagementService('신입생 공지 관리', 'freshman')
}

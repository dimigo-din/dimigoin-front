export const Circle = applicant => ({
  idx: applicant['idx'],
  name: applicant['name'],
  description: applicant['description'],
  category: applicant['category'],
  profileImg: applicant['profile_img'] ||
    require(`@/assets/avatar/${Math.ceil(Math.random() * 5)}.jpg`),
  requestStartDate: applicant['request_start_date'],
  requestEndDate: applicant['request_end_date'],
  chairIdx: applicant['chair_idx'],
  chairSerial: applicant['chair_serial'],
  chairName: applicant['chair_name'],
  status: applicant['status']
})

export const CircleApplicant = applicant => ({
  idx: applicant['idx'],
  name: applicant['name'],
  serial: applicant['serial'],
  circleIdx: applicant['circle_idx'],
  userIdx: applicant['user_idx'],
  introduce: applicant['introduce'],
  status: applicant['status']
})

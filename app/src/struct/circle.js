import { struct } from 'superstruct'

const _Circle = struct({
  name: 'string',
  description: 'string',
  category: 'string',
  profileImg: 'string | null',
  applyStartDate: 'string',
  applyEndDate: 'string',
  chairIdx: 'string',
  chairSerial: 'string',
  chairName: 'string'
})

const _CircleApplicant = struct({
  idx: 'string',
  circleIdx: 'string',
  userIdx: 'string',
  status: 'string',
  time: 'string'
})

export const Circle = (applicant) => {
  return _Circle({
    name: applicant['name'],
    description: applicant['description'],
    category: applicant['category'],
    profileImg: applicant['profile_img'] ||
      require(`../../assets/avatar/${Math.ceil(Math.random() * 5)}.jpg`),
    applyStartDate: applicant['apply_start_date'],
    applyEndDate: applicant['apply_end_date'],
    chairIdx: applicant['chair_idx'],
    chairSerial: applicant['chair_serial'],
    chairName: applicant['chair_name']
  })
}

export const CircleApplicant = (applicant) => {
  return _CircleApplicant({
    idx: applicant['idx'],
    circleIdx: applicant['circle_idx'],
    userIdx: applicant['user_idx'],
    status: applicant['status'],
    time: applicant['apply_time']
  })
}

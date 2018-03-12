import { struct } from 'superstruct'

const _Circle = struct({
  idx: 'number',
  name: 'string',
  description: 'string',
  category: 'string',
  profileImg: 'string | null | undefined',
  applyStartDate: 'string',
  applyEndDate: 'string',
  chairIdx: 'string',
  chairSerial: 'string',
  chairName: 'string',
  status: 'string | null | undefined'
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
    idx: applicant['idx'],
    name: applicant['name'],
    description: applicant['description'],
    category: applicant['category'],
    profileImg: applicant['profile_img'] ||
      require(`../../assets/avatar/${Math.ceil(Math.random() * 5)}.jpg`),
    applyStartDate: applicant['apply_start_date'],
    applyEndDate: applicant['apply_end_date'],
    chairIdx: applicant['chair_idx'],
    chairSerial: applicant['chair_serial'],
    chairName: applicant['chair_name'],
    status: applicant['status']
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

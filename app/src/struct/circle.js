import { struct } from 'superstruct'

const _Circle = struct({
  // TODO
})

const _CircleApplicant = struct({
  idx: 'string',
  circleIdx: 'string',
  userIdx: 'string',
  status: 'string',
  time: 'string'
})

export const Circle = (circle) => {
  return _Circle({
    // TODO
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

import { struct } from 'superstruct'

const _Ingang = struct({

})

const _IngangApplicant = struct({
  idx: 'number',
  grade: 'number',
  klass: 'number',
  day: 'string',
  time: 'string',
  max: 'number'
})

export const Ingang = ingang => new _Ingang(ingang)
export const IngangApplicant = applicant => new _IngangApplicant(applicant)

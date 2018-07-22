import axios from './axios'
import { Dets } from '@/src/struct/dets'

function tempValidation (dets) {
  const keys = ['title', 'description', 'request_start_date', 'request_end_date', 'day', 'time', 'room', 'max_of_count']
  for (const key of keys) {
    if (!dets[key]) throw new Error('모든 입력란을 채워주세요')
  }

  const validDate = new Date(dets.request_start_date).getTime() + new Date(dets.request_end_date).getTime() + new Date(dets.time).getTime()
  if (isNaN(validDate)) {
    throw new Error('날짜를 모두 정확하게 채워주세요.')
  }
}

export async function getStudentDets () {
  try {
    const res = await axios.get(`/dets/student`)
    return res.data['dets'].map(Dets)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getGradeDets (grade) {
  try {
    const res = await axios.get(`/dets/grade/${grade}`)
    return res.data['dets'].map(Dets)
  } catch ({ message, response: res}) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getDets (idx) {
  try {
    const res = await axios.get(`/dets/${idx}`)
    return res.data['dets'].map(Dets)
  } catch ({ message, response: res }) {
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function createDets (grade, dets) {
  tempValidation(dets)

  try {
    await axios.post(`/dets/`, {
      'title': dets['title'],
      'description': dets['description'],
      'request_start_date': dets['request_start_date'],
      'request_end_date': dets['request_end_date'],
      'day': dets['day'],
      'time': dets['time'],
      'room': dets['room'],
      'max_of_count': dets['max_of_count'],
      'target_grade': grade
    })
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('권한이 없습니다')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function changeDets (idx, grade, dets) {
  try {
    await axios.put(`/dets/${idx}`, {
      'title': dets['title'],
      'description': dets['description'],
      'request_start_date': dets['request_start_date'],
      'request_end_date': dets['request_end_date'],
      'day': dets['day'],
      'time': dets['time'],
      'room': dets['room'],
      'max_of_count': dets['max_of_count'],
      'target_grade': grade
    })
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('권한이 없습니다.')
      case 500:
        throw new Error('Dets를 수정하던 중 문제가 발생했습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')

    }
  }
}

export async function deleteDets (idx) {
  try {
    await axios.delete(`/dets/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('존재하지 않는 Dets 입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getSpeakerDets () {
  try {
    const res = await axios.get(`/dets/speaker`)
    return res.data['dets'].map(Dets)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function changeSpeakerDets (idx, grade, dets) {
  try {
    await axios.put(`/dets/speaker/${idx}`, {
      'title': dets['title'],
      'description': dets['description'],
      'request_start_date': dets['request_start_date'],
      'request_end_date': dets['request_end_date'],
      'day': dets['day'],
      'time': dets['time'],
      'room': dets['room'],
      'max_of_count': dets['max_of_count'],
      'target_grade': grade
    })
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('존재하지 않는 Dets 입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')

    }
  }
}

export async function deleteSpeakerDets (idx) {
  try {
    await axios.delete(`/dets/speaker/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('존재하지 않는 Dets 입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function applyDets (idx) {
  try {
    await axios.post(`/dets/request/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 401:
        throw new Error('잘못된 학년에 신청했습니다.')
      case 403:
        throw new Error('신청 기간이 아니거나 마감되었습니다.')
      case 404:
        throw new Error('존재하지 않는 Dets 입니다.')
      case 409:
        throw new Error('이미 신청을 완료했습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function cancelDets (idx) {
  try {
    await axios.delete(`/dets/request/${idx}`)
  } catch {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('신청 기간이 아닙니다.')
      case 404:
        throw new Error('존재하지 않는 Dets 신청입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

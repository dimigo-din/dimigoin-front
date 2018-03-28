export default async (action, errorHandler) => {
  try {
    const res = await action()

    return res.data
  } catch (err) {
    console.warn(err)
    if (!err.res) throw new Error('네트워크에 문제가 있습니다.')

    const handler = errorHandler[err.status]
    const defaultHandler = errorHandler['default'] || (() => {})

    const value = handler ? handler() : defaultHandler()

    if (value instanceof Error) throw value
    else return value
  }
}

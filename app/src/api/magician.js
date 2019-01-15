export default async (action, errorHandler = {}) => {
  try {
    const res = await action()

    return res
  } catch (err) {
    if (!err.response) return Promise.reject(err)

    const handler = errorHandler[err.response.status] ||
      errorHandler['default'] ||
      (() => err)

    const value = handler()

    if (value instanceof Error) return Promise.reject(value)
    else return { data: value }
  }
}

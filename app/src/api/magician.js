import APIError from '@/src/errors/api-error'

/**
 * Handles axios error
 *
 * @typedef {AxiosResponse & { error: (AxiosError | undefined) }} CustomResponse
 * @function magician
 * @param {function(): Promise<CustomResponse, AxiosError>} action
 * @param {Object<number, (string | function(AxiosError): *)>} [errorHandler={}]
 * @returns {CustomResponse}
 * @throws {Error}
 */
export default async function magician (action, errorHandler = {}) {
  try {
    return await action()
  } catch (err) {
    if (!err.response) throw err

    const handler = errorHandler[err.response.status] || errorHandler['default']

    if (!handler) throw err
    if (typeof handler === 'string') throw new APIError(handler, err.response.status)
    if (typeof handler !== 'function') throw new TypeError('type of errorHandler is invalid')

    const value = handler(err)

    return {
      ...err.response,
      error: err,
      data: value instanceof Promise ? await value : value
    }
  }
}

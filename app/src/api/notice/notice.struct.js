/**
 * @typedef Notice~Notice
 * @property {number} idx
 * @property {string} desc
 */

/**
 * @param {object} notice
 * @returns {Notice~Notice}
 */
export const Notice = notice => ({
  idx: notice['idx'],
  desc: notice['description']
})

import qs from 'query-string'

import * as types from './types'

const API_ENDPOINT = 'https://wwtbot.localtunnel.me/webview'
const LOGAN_MID = '1206228496160213'
const closeImage = 'image_url=https://s3.amazonaws.com/we-walk-together/logo.png'
const closeMessage = 'display_text=Returning to the chat...'
const CLOSE_WEBVIEW_URL = `https://www.messenger.com/closeWindow/?${closeImage}&${closeMessage}`

/**
 * Webview MessengerExtensions
 */
export function closeWebview() {
  return (dispatch) => {
    window.location = CLOSE_WEBVIEW_URL
    dispatch({ type: types.CLOSE_WEBVIEW })
  }
}

function fetchUserId() {
  return new Promise(function(resolve, reject) {
    window.MessengerExtensions.getUserID(
      (uids) => resolve(uids.psid),
      (err, errorMessage) => reject(err)
    )
  })
}

function cacheUserId(mid) {
  window.localStorage.mid = mid
}

function getCachedUserId() {
  if (process.env.NODE_ENV === 'development') {
    return LOGAN_MID
  }
  return window.localStorage.mid
}

function extensionsInit() {
  return new Promise(function(resolve, reject) {
    window.extAsyncInit = () => { resolve() }
  })
}

/**
 * Action Creators
 */
export function fetchUser() {
  return (dispatch) => {
    dispatch({ type: types.INIT_USER })
    const mid = getCachedUserId()
    if (mid) {
      return dispatch({ type: types.INIT_USER_SUCCESS, mid })
    }
    else {
      return extensionsInit()
      .then(fetchUserId)
      .then((id) => {
        cacheUserId(id)
        return dispatch({ type: types.INIT_USER_SUCCESS, mid: id })
      })
      .catch((err) => dispatch({ type: types.INIT_USER_FAILURE, err }))
    }
  }
}

export function submitScheduleSession(days, hours) {
  return (dispatch) => {
    dispatch({ type: types.SCHEDULE_SESSION, days, hours  })
    return postScheduleSession(days, hours).then(
      (res) => { dispatch(closeWebview()); dispatch({ type: types.SCHEDULE_SESSION_SUCCESS }) },
      (err) => dispatch({ type: types.SCHEDULE_SESSION_FAILURE, err }),
    )
  }
}

function postScheduleSession(days, hours) {
  return fetch(`${API_ENDPOINT}/schedule/session`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mid: getCachedUserId(),
      hours,
      days,
    }),
    mode: 'cors'
  })
}

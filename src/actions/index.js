import qs from 'query-string'
import { push } from 'react-router-redux'

import * as types from './types'

const API_ENDPOINT = 'https://a4ec3761.ngrok.io/webview'
// const API_ENDPOINT = 'https://wwtbot.localtunnel.me/webview'
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
      return getUser(mid).then(res => res.json()).then(
        (res) => dispatch({ type: types.INIT_USER_SUCCESS, mid, res }),
        (err) => dispatch({ type: types.INIT_USER_FAILURE, err }),
      )
    }
    else {
      return extensionsInit()
      .then(fetchUserId)
      .then((id) => {
        cacheUserId(id)
        return getUser(mid).then(
          (res) => dispatch({ type: types.INIT_USER_SUCCESS, mid, res }),
          (err) => dispatch({ type: types.INIT_USER_FAILURE, err }),
        )
      })
      .catch((err) => dispatch({ type: types.INIT_USER_FAILURE, err }))
    }
  }
}

function getUser(mid) {
  return fetch(`${API_ENDPOINT}/user/${mid}`, {
    // mode: 'cors'
  })
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

export function submitScheduleTimePeriod(days, start, end) {
  return (dispatch) => {
    dispatch({ type: types.SCHEDULE_TIMEPERIOD, days, start, end  })
    return postScheduleTimePeriod(days, start, end).then(
      (res) => { dispatch({ type: types.SCHEDULE_TIMEPERIOD_SUCCESS }); dispatch(push('schedule')) },
      (err) => dispatch({ type: types.SCHEDULE_TIMEPERIOD_FAILURE, err }),
    )
  }
}

function postScheduleTimePeriod(days, start, end) {
  return fetch(`${API_ENDPOINT}/schedule/timePeriod`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mid: getCachedUserId(),
      days, start, end
    }),
    mode: 'cors'
  })
}

export function removeTimePeriod(day, start, end) {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_TIMEPERIOD, day, start, end  })
    return postRemoveTimePeriod(day, start, end).then(
      (res) => dispatch({ type: types.REMOVE_TIMEPERIOD_SUCCESS, day, start, end }),
      (err) => dispatch({ type: types.REMOVE_TIMEPERIOD_FAILURE, err }),
    )
  }
}

function postRemoveTimePeriod(day, start, end) {
  return fetch(`${API_ENDPOINT}/schedule/timePeriod/remove`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mid: getCachedUserId(),
      day, start, end
    }),
    mode: 'cors'
  })
}

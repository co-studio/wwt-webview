import qs from 'query-string'

import * as types from './types'

const API_ENDPOINT = 'https://wwtbot.localtunnel.me/webview'
const LOGAN_MID = '1190686434388188'

/**
 * Webview MessengerExtensions
 */
export function closeWebview() {
  return (dispatch) =>
    window.MessengerExtensions.requestCloseBrowser(
      () => dispatch({ type: types.CLOSE_WEBVIEW }),
      (err) => dispatch({ type: types.CLOSE_WEBVIEW, err })
    )
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
    const mid = getCachedUserId()
    if (mid) {
      return dispatch({ type: types.INIT_USER, mid })
    }
    else {
      return extensionsInit()
      .then(fetchUserId)
      .then((id) => {
        cacheUserId(id)
        return dispatch({ type: types.INIT_USER, mid: id })
      })
      .catch((err) => dispatch({ type: types.INIT_USER, err }))
    }
  }
}

export function updateForm(formName, fields) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_FORM, formName, fields  })
    return postForm(formName, fields).then(
      (res) => dispatch({ type: types.UPDATE_FORM_SUCCESS }),
      (err) => dispatch({ type: types.UPDATE_FORM_FAILURE, err }),
    )
  }
}

function postForm(formName, fields) {
  return fetch(API_ENDPOINT, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'form',
      form: {
        name: formName,
        fields: fields,
        status: 'incomplete'
      },
      outbound: getCachedUserId(),
      timestamp: createTimestamp()
    }),
    mode: 'cors'
  })
}

export function fetchForm(formName) {
  return (dispatch) => {
    dispatch({ type: types.GET_FORM, formName })
    return getForm(formName).then(
      (res) => res.json().then(body => dispatch({ type: types.GET_FORM_SUCCESS, formName, body })),
      (err) => dispatch({ type: types.GET_FORM_FAILURE, err }),
    )
  }
}

function getForm(formName) {
  const params = qs.stringify({
    name: formName,
    mid: getCachedUserId()
  })
  return fetch(`${API_ENDPOINT}?${params}`, { mode: 'cors' })
}

export function updateAndCompleteForm(formName, fields) {
  return (dispatch) => {
    return dispatch(updateForm(formName, fields)).then(() => {
      return dispatch(completeForm(formName, fields))
    })
  }
}

export function completeForm(formName, fields) {
  return (dispatch) => {
    dispatch({ type: types.COMPLETE_FORM, formName })
    return postCompleteForm(formName).then(
      (res) => { dispatch(closeWebview()); dispatch({ type: types.COMPLETE_FORM_SUCCESS }) },
      (err) => dispatch({ type: types.COMPLETE_FORM_FAILURE, err }),
    )
  }
}

function postCompleteForm(formName) {
  return fetch(API_ENDPOINT, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'form',
      form: {
        name: formName,
        status: 'complete'
      },
      outbound: getCachedUserId(),
      timestamp: createTimestamp()
    }),
    mode: 'cors'
  })
}

export function sendPostbackEvent(payload) {
  return (dispatch) => {
    dispatch({ type: types.SEND_POSTBACK_EVENT, payload })
    return postPostbackEvent(payload).then(
      dispatch(closeWebview())
    )
  }
}

function postPostbackEvent(payload) {
  return fetch(API_ENDPOINT, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'postback',
      postback: payload,
      outbound: getCachedUserId(),
      timestamp: createTimestamp()
    }),
    mode: 'cors'
  })
}

function createTimestamp() {
  return Math.round(new Date().getTime() / 1000)
}

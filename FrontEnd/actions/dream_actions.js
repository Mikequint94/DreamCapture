import * as DreamUtil from '../util/dream_util';

export const RECEIVE_ALL_DREAMS = 'RECEIVE_ALL_DREAMS';
export const RECEIVE_DREAM = 'RECEIVE_DREAM';

export const RECEIVE_DREAM_ERRORS = "RECEIVE_DREAM_ERRORS";
export const CLEAR_DREAM_ERRORS = "CLEAR_DREAM_ERRORS";

export const receiveErrors = (errors) => ({
  type: RECEIVE_DREAM_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_DREAM_ERRORS,
});

export const receiveAllDreams = dreams => ({
  type: RECEIVE_ALL_DREAMS,
  dreams
});

export const receiveDream = dream => ({
  type: RECEIVE_DREAM,
  dream
});

export const requestDream = dreamId => dispatch => (
  DreamUtil.fetchDream(dreamId)
    .then(dream => dispatch(receiveDream(dream)))
);
export const requestUserDreams = userId => dispatch => (
  DreamUtil.fetchUserDreams(userId)
    .then(dreams => dispatch(receiveAllDreams(dreams)))
);

export const createDream = data => dispatch => (
  DreamUtil.createDream(data)
    .then(dream => dispatch(receiveDream(dream)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateDream = data => dispatch => (
  DreamUtil.updateDream(data)
    .then(dream => dispatch(receiveDream(dream)),
    err => (dispatch(receiveErrors(err.responseJSON))))
);

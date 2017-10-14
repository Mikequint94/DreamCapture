export const RECEIVE_REMINDER = 'RECEIVE_REMINDER';

export const receiveReminder = reminder => ({
  type: RECEIVE_REMINDER,
  reminder
});

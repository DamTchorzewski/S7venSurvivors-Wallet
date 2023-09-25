import { createAction } from '@reduxjs/toolkit';

// pending
export const registerRequest = createAction('register/registerRequest');
// fulfilled
export const registerSuccess = createAction('register/registerSuccess');
// rejected
export const registerError = createAction('register/registerError');
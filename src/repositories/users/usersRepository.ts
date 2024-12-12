import apiClient, {
  errorCallback,
  initReqWithJwtToken,
  sendRequestWithParams,
  successCallback,
} from '@/repositories/apiClient';
import sendRequest from '../reconfig-async-client';
import { postLoginParam, postRegisterParam, putUserParam } from './usersRepository.param';

export const postLogin = async ({ email, password }: postLoginParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams('/users/login', {
    ...reqSpecs,
    method: 'POST',
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
// export const postLogin = async ({ email, password }: postLoginParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/users/login`,
//     data: {
//       user: {
//         email,
//         password,
//       },
//     },
//   });
// };

export const postRegister = async ({ username, email, password }: postRegisterParam) => {
  return await sendRequestWithParams('/users', {
    method: 'POST',
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// export const postRegister = async ({ username, email, password }: postRegisterParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/users`,
//     data: {
//       user: {
//         username,
//         email,
//         password,
//       },
//     },
//   });
// };

export const getUser = async () => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams('/user', { ...reqSpecs });
};

// export const getUser = async () => {
//   return await apiClient({
//     method: 'get',
//     url: `/user`,
//   });
// };

export const putUser = async (data: { user: putUserParam }) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams('/user', {
    ...reqSpecs,
    method: 'PUT',
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
// export const putUser = async (data: { user: putUserParam }) => {
//   return await apiClient({
//     method: 'put',
//     url: '/user',
//     data,
//   });
// };

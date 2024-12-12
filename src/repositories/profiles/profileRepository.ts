import apiClient, { initReqWithJwtToken, sendRequestWithParams } from '@/repositories/apiClient';
import { profileParam } from './profileRepository.param';

export const getProfile = async ({ username }: profileParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/profiles/${username}`, { ...reqSpecs });
};
// export const getProfile = async ({ username }: profileParam) => {
//   return await apiClient({
//     method: 'get',
//     url: `/profiles/${username}`,
//   });
// };

export const followUser = async ({ username }: profileParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/profiles/${username}/follow`, {
    ...reqSpecs,
    method: 'POST',
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// export const followUser = async ({ username }: profileParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/profiles/${username}/follow`,
//   });
// };

export const unfollowUser = async ({ username }: profileParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/profiles/${username}/follow`, {
    ...reqSpecs,
    method: 'DELETE',
  });
};

// export const unfollowUser = async ({ username }: profileParam) => {
//   return await apiClient({
//     method: 'delete',
//     url: `/profiles/${username}/follow`,
//   });
// };

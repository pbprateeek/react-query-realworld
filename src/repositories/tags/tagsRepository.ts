import apiClient, { initReqWithJwtToken, sendRequestWithParams } from '@/repositories/apiClient';

export const getTags = async () => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/tags`, { ...reqSpecs });
};

// export const getTags = async () => {
//   return await apiClient({
//     method: 'get',
//     url: `/tags`,
//   });
// };

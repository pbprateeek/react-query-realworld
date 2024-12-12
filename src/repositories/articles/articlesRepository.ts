import apiClient, {
  errorCallback,
  initReqWithJwtToken,
  sendRequestWithParams,
  successCallback,
} from '@/repositories/apiClient';
import sendRequest from '../reconfig-async-client';
import {
  getArticlesParam,
  getArticleParam,
  createArticleParam,
  updateArticleParam,
  deleteArticleParam,
  getCommentsParam,
  createCommentParam,
  deleteCommentParam,
  favoriteParam,
} from './articlesRepository.param';
import { UNIT_PER_PAGE } from '@/constants/units.constants';

export const getArticles = async ({ isGlobal, selectedTag, page, username, isFavorited }: getArticlesParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(
    `/articles${isGlobal || username ? '' : '/feed'}?limit=${UNIT_PER_PAGE}&offset=${UNIT_PER_PAGE * (page - 1)}${
      selectedTag ? `&tag=${selectedTag}` : ''
    }${username ? `&${isFavorited ? 'favorited' : 'author'}=${username}` : ''}`,
    { ...reqSpecs },
  );
};
// export const getArticles = async ({ isGlobal, selectedTag, page, username, isFavorited }: getArticlesParam) => {
//   return await apiClient({
//     method: 'get',
//     url: `/articles${isGlobal || username ? '' : '/feed'}?limit=${UNIT_PER_PAGE}&offset=${UNIT_PER_PAGE * (page - 1)}${
//       selectedTag ? `&tag=${selectedTag}` : ''
//     }${username ? `&${isFavorited ? 'favorited' : 'author'}=${username}` : ''}`,
//   });
// };

export const getArticle = async ({ slug }: getArticleParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}`, { ...reqSpecs });
};
// export const getArticle = async ({ slug }: getArticleParam) => {
//   return await apiClient({
//     method: 'get',
//     url: `/articles/${slug}`,
//   });
// };

export const createArticle = async ({ title, description, body, tagList }: createArticleParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles`, {
    ...reqSpecs,
    method: 'POST',
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// export const createArticle = async ({ title, description, body, tagList }: createArticleParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/articles`,
//     data: {
//       article: {
//         title,
//         description,
//         body,
//         tagList,
//       },
//     },
//   });
// };

// export const updateArticle = async ({ slug, title, description, body, tagList }: updateArticleParam) => {
//   return await apiClient({
//     method: 'put',
//     url: `/articles/${slug}`,
//     data: {
//       article: {
//         title,
//         description,
//         body,
//         tagList,
//       },
//     },
//   });
// };

export const updateArticle = async ({ slug, title, description, body, tagList }: updateArticleParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}`, {
    ...reqSpecs,
    method: 'PUT',
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const deleteArticle = async ({ slug }: deleteArticleParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}`, {
    ...reqSpecs,
    method: 'DELETE',
  });
};

// export const deleteArticle = async ({ slug }: deleteArticleParam) => {
//   return await apiClient({
//     method: 'delete',
//     url: `/articles/${slug}`,
//   });
// };

export const getComments = async ({ slug }: getCommentsParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}/comments`, { ...reqSpecs });
};

// export const getComments = async ({ slug }: getCommentsParam) => {
//   return await apiClient({
//     method: 'get',
//     url: `/articles/${slug}/comments`,
//   });
// };

export const createComment = async ({ slug, body }: createCommentParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}/comments`, {
    ...reqSpecs,
    method: 'POST',
    body: JSON.stringify({
      comment: {
        body,
      },
    }),
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// export const createComment = async ({ slug, body }: createCommentParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/articles/${slug}/comments`,
//     data: {
//       comment: {
//         body,
//       },
//     },
//   });
// };

export const deleteComment = async ({ slug, id }: deleteCommentParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}/comments/${id}`, {
    ...reqSpecs,
    method: 'DELETE',
  });
};

// export const deleteComment = async ({ slug, id }: deleteCommentParam) => {
//   return await apiClient({
//     method: 'delete',
//     url: `/articles/${slug}/comments/${id}`,
//   });
// };

export const favoriteArticle = async ({ slug }: favoriteParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}/favorite`, {
    ...reqSpecs,
    method: 'POST',
    headers: {
      ...reqSpecs?.headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// export const favoriteArticle = async ({ slug }: favoriteParam) => {
//   return await apiClient({
//     method: 'post',
//     url: `/articles/${slug}/favorite`,
//   });
// };

export const unfavoriteArticle = async ({ slug }: favoriteParam) => {
  const reqSpecs = initReqWithJwtToken();
  return await sendRequestWithParams(`/articles/${slug}/favorite`, {
    ...reqSpecs,
    method: 'DELETE',
  });
};
// export const unfavoriteArticle = async ({ slug }: favoriteParam) => {
//   return await apiClient({
//     method: 'delete',
//     url: `/articles/${slug}/favorite`,
//   });
// };

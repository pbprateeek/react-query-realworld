export interface getArticlesParam {
  query: string;
}

export interface getArticleParam {
  slug: any;
}

export interface postArticleParam {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
import Feed from '@/components/Feed';
import { getTags } from '@/repositories/tags/tagsRepository';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useGetArticlesQuery } from '@/queries/articles.query';
import { scrollToTop } from '@/lib/utils';
import { UNITS_PER_PAGE } from '@/constants/config.constants';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [isGlobal, setIsGlobal] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [query, setQuery] = useState(`?limit=${UNITS_PER_PAGE}&offset=0`);
  const { data } = useGetArticlesQuery(query);

  useEffect(() => {
    getTags().then((res) => {
      setTags(res.data.tags);
    });
  }, []);

  useEffect(() => {
    setQuery(
      `${isGlobal ? '' : '/feed'}?limit=${UNITS_PER_PAGE}&offset=${UNITS_PER_PAGE * (page - 1)}${
        selectedTag ? `&tag=${selectedTag}` : ''
      }`,
    );
  }, [isGlobal, selectedTag, page]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className={`nav-link ${isGlobal ? '' : 'active'}`} to="/" onClick={() => setIsGlobal(false)}>
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isGlobal ? 'active' : ''}`} to="/" onClick={() => setIsGlobal(true)}>
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>
            {data.articles.length !== 0 ? (
              <>
                {data.articles.map((article: any) => (
                  <Feed key={article.title} article={article} />
                ))}
              </>
            ) : (
              <div>No articles are here... yet.</div>
            )}

            <nav>
              <ul className="pagination">
                {data.articlesCount > UNITS_PER_PAGE ? (
                  Array.from(Array(data.articlesCount / UNITS_PER_PAGE).keys()).map((index) => (
                    <li
                      key={index + 1}
                      role="presentation"
                      className={`page-item ${page === index + 1 ? 'active' : ''}`}
                      onClick={() => {
                        setPage(index + 1);
                        scrollToTop();
                      }}
                    >
                      <NavLink to="/" className="page-link">
                        {index + 1}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </nav>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag: string) => (
                  <Link
                    to="/"
                    key={tag}
                    className="tag-pill tag-default"
                    onClick={() => {
                      setSelectedTag(tag);
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const data = useStaticQuery(graphql`
    query LocalSearchQuery {
      localSearchPages {
        index
        store
      }
    }
  `);

  const search = event => {
    const query = event.target.value;
    // eslint-disable-next-line no-console
    console.log(window.__LUNR__);
    // Use the local search index and store fetched by useStaticQuery.
    const index = typeof window !== 'undefined' ? window.__LUNR__['pages'] : null;

    if (index) {
      const results = index.search(query);

      // Map over each ID and return the full document from the store.
      const searchResults = results.map(({ ref }) => data.localSearchPages.store[ref]);

      setResults(searchResults);
    } else {
      console.error('Lunr index not available');
    }

    setQuery(query);
  };

  return (
    <div>
      <input type="text" value={query} onChange={search} placeholder="Search..." />
      <ul>
        {results.map(page => (
          <li key={page.id}>
            <a href={page.path}>{page.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;

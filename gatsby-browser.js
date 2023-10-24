import lunr from 'lunr';
import stemmerSupport from 'lunr-languages/lunr.stemmer.support';
// If lunr.en.js doesn't exist, this line will throw an error.
// We'll comment it out for now and provide a solution below.
// import lunrEn from 'lunr-languages/lunr.en';

stemmerSupport(lunr);
// If lunr.en.js doesn't exist, this line will throw an error.
// lunrEn(lunr);

// ... any other browser API exports or logic ...

export const onClientEntry = () => {
  // No need to import the stemmer and language files here since they're
  // imported and applied above. Just set up the __LUNR__ global if needed.
  window.__LUNR__ = window.__LUNR__ || {};
};

/* globals twttr ga */

const weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds' });
  }, 2000);
});

const tweets = new Promise((resolve) => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

Promise
  .all([weather, tweets])
  .then((responses) => {
    const [weatherInfo, tweetInfo] = responses;
    console.log(weatherInfo, tweetInfo);
  });

const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then((responses) => {
    console.log(responses);
  });

// Twitter, Google, Facebook analytics put a global variable
// in your window so eslint would return a error of undefined
// We can set globals inside of this specific file
// (1) Go to the top of the file
// (2) Make a block comment
// (3) Say "globals twttr ga"
ga.track();
twttr.trackConversion();

// Ignore everything for a specific rule
// (1) Go to the top of the file
// (2) Make a block comment
// (3) Say "eslint-disable rule-to-disable"

// Ignore a section for a specific rule
// (1) /* eslint-disable rule-to-disbale */
// (2) { ... }
// (3) /* eslint-enable rule-to-enable */

// Ignore every single rule for entire block
// (1) /* eslint-disable */
// (2) { ... }
// (3) /* eslint-enable */

/* eslint-disable */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);
      var len = o.length >>> 0;
      
      if (len === 0) {
        return false;
      }
      
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      return false;
    }
  });
}
/* eslint-enable */

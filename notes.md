# es6.io: 01. Scope
---

```javascript
// var is function scope
function() {
 // ....
}

// let, const are block scope
{
	// ...
}
```

## let and const

```javascript
// const cannot be updated
const key = 'abc123';
let points = 50;
// winner is scoped to window
// thus it will return false
// if it was var it would return true
// because of the scope
let winner = false;

if (points > 40) {
  // winner is scoped to this block
  let winner = true;
}
```

```javascript
// const is not immutable
// you can't reasign const
// but you can change it's properties
const person = {
	name: 'Wes';
	age: 28
}

// this works
person.age = 30;
```

```javascript
// you can use freeze for that
const person = {
	name: 'Wes';
	age: 28
}

const wes = Object.freeze(person);

// this won't work
wes.age = 30;
```

## Immediately-invoked function expression (IIFE)

```javascript
// someone could overwrite this
var name = 'wes';

// so we could use this
(function() {
  // IIFE is a function that runs immediately
  // and lives on the browser window
  // we can put our variables here
  // var is scoped to this function now
  // thus not available in the global scope
  // name would return blank
  var name = 'wes';
})();
```

```javascript
// we don't need to do that with let, const
// because they're block scope
{
  // name would return blank
  const name = 'wes';
}
```

## var leaks

```javascript
for (var i = 0; i < 10; i++) {
  // now we have a global variable
  // that leaks outside of the block scope
  console.log(i);

  // we can't reference what the variable was at the time of running
  // and not at the current time
  // other than using a IIFE
  // one quick fix is to simply use let instead of var
  setTimeout(function() {
    console.log(`The number is ${i}`);
  }, 1000);
}
```

## Temporal dead zone

```javascript
// you can access var variables before they're defined
// but not their value, just the fact they're created
// using let, const throws an error and breaks your code

// returns undefined
console.log(pizza);
var pizza = 'Deep Dish 🍕🍕🍕';
```

# 02. Arrow functions
---

## Three main benefits:

- ### Much more concise
- ### Implicit return (nifty one liners)
- ### Doesn't rebind value of this

```javascript
const names = ['wes', 'kait', 'lux'];

// regular function
const fullNames = names.map(function(name) {
  return `${name} bos`;
});

// arrow function
const fullNames = names.map(function(name) {
  return `${name} bos`;
});

// shorter arrow function
// no paranthesis needed for one argument
// or curly brackets for a implicit return
// and we can drop the return keyword
const fullNames = names.map(name => `${name} bos`);

// arrow function without arguments
const fullNames = names.map(() => `cool bos`);
```

## What is a anonymous function?

```javascript
// named function
// benefit for error reporting
// since it would return the name
// good stack trace
function sayMyName(name) {
  alert(`Hello ${name}!`);
}

// anonymous function
// you can't name them
// arrow functions are always anonymous
// not very good stack trace
const sayMyName = name => {
  alert(`Hello ${name}!`);
};
```

## Arrow function examples

---

## Map object

```javascript
const  race = '100m Dash';
const winners = ['Hunter Gath', 'Singa Song', 'Imda Bos'];

// this wouldn't work
// javascript thinks it's a function block
// because of the { ... }
const win = winners.map((winner, i) => { name: winner, race: race, place: i });

// we want to return a object literal
// and not a function block
// so we wrap the object in paranthesis
// race is same as race: race (es6 feature)
// place: i + 1 so it's not zero based
const win = winners.map((winner, i) => ({ name: winner, race, place: i + 1 }));
```

## Filter by age

```javascript
const ages = [23, 62, 45, 34, 23, 64, 43, 60, 32];

const old = ages.filter(age => age >= 60);
```

## Arrow function this
---
### arrow-function-this.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Arrow Functions</title>
</head>

<body>

  <style>
    .wrap {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
      font-weight: 100;
      color: white;
    }

    .box {
      background: black url(https://unsplash.it/1500/1500?image=560&blur=0.5) center fixed no-repeat;
      width: 50px;
      height: 50px;
      padding: 50px;
      transition: width 0.2s, height 0.6s;
      position: relative;
    }

    .box.opening {
      width: 500px;
      height: 500px;
    }

    .box h2 {
      position: absolute;
      width: 100%;
      font-size: 100px;
      transform: translateX(-200%);
      transition: all 0.5s;
      top: 0;
    }

    .box p {
      position: absolute;
      width: 100%;
      transform: translateX(200%);
      transition: all 0.5s;
      bottom: 0;
    }

    .box.open>* {
      transform: translateX(0%);
    }
  </style>

  <div class="wrap">
    <div class="box">
      <h2>Wes Bos</h2>
      <p class="social">@wesbos</p>
    </div>
  </div>

  <script>
    const box = document.querySelector('.box');
    // why are we using a regular function?
    box.addEventListener('click', function () {
      // we want to reference the box that got clicked
      // it logs the box div because this is equal to the box
      // if you use a arrow function
      // the value of this is not rebound inside of that function
      // it is just inherited from whatever the parent scope is
      // the parent scope of this is the window so it would log window
      console.log(this);

      let first = 'opening';
      let second = 'open';

      // we want to reverse the process
      // so by using destructuring we can swap the variables
      if (this.classList.contains(first)) {
        [first, second] = [second, first];
      }

      // if we were to output this here it would return window
      // because we have entered a new function and it hasn't been bound to anything
      // so this is going to be equal to the window
      // we could fix this by declaring var self above the function and asigning it this
      // then calling self.classList.toggle('open)
      // but it's much easier to just use a arrow function
      // it doesn't change the value of this, it inherits the value of this from the parent
      // we don't have to worry about the scope changing
      this.classList.toggle(first);
      setTimeout(() => {
        this.classList.toggle(second);
      }, 500);
    });
  </script>

</body>

</html>
```

## Default function arguments
---
### default-arguments.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Default Arguments</title>
</head>

<body>
  <script>
    // what happens if we want to assume 13% tax rate and 15% tip rate?
    // now in es6 we can just set it when we define our function
    function calculateBill(total, tax = 0.13, tip = 0.15) {
      // we would normally do something like this
      // tax = tax || 0.13;
      // tip = tip || 0.15;

      return total + (total * tax) + (total * tip);
    }

    // if we weren't to pass them in we would get undefined back
    // but with es6 those values are now assumed if nothing is passed in
    // we can explicitly pass undefined if we want to keep a value but change another
    const totalBill = calculateBill(100, undefined, 0.25);
    console.log(totalBill);
  </script>
</body>

</html>
```

## When not to use arrow functions?
---
### when-not-to-use-arrows.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>When _not_ to use arrows =></title>
</head>
<body>
<style>
  button { font-size: 100px; }
  .on { background: #ffc600; }
</style>
<button id="pushy">Push Me</button>

<script>
  // When you really need `this`
  const button = document.querySelector('#pushy');
  button.addEventListener('click', function() {
    console.log(this);
    this.classList.toggle('on');
  });

  // When you need a method to bind to an object
  const person = {
    points: 23,
    score() {
      console.log(this);
      this.points++;
    }
  }

  // When you need to add a prototype method
  class Car {
    constructor(make, colour) {
      this.make = make;
      this.colour = colour;
    }
  }

  const beemer = new Car('bmw', 'blue');
  const subie = new Car('Subaru', 'white');

  Car.prototype.summarize = function() {
     return `This car is a ${this.make} in the colour ${this.colour}`;
  };

  // When you need arguments object
  const orderChildren = function() {
    const children = Array.from(arguments);
    return children.map((child, i) => {
      return `${child} was child #${i + 1}`;
    })
    console.log(arguments);
  }


</script>
</body>
</html>
```

## Exercise 1
---
### exercise 1.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Arrow Functions</title>
</head>

<body>

  <ul>
    <li data-time="5:17">Flexbox Video</li>
    <li data-time="8:22">Flexbox Video</li>
    <li data-time="3:34">Redux Video</li>
    <li data-time="5:23">Flexbox Video</li>
    <li data-time="7:12">Flexbox Video</li>
    <li data-time="7:24">Redux Video</li>
    <li data-time="6:46">Flexbox Video</li>
    <li data-time="4:45">Flexbox Video</li>
    <li data-time="4:40">Flexbox Video</li>
    <li data-time="7:58">Redux Video</li>
    <li data-time="11:51">Flexbox Video</li>
    <li data-time="9:13">Flexbox Video</li>
    <li data-time="5:50">Flexbox Video</li>
    <li data-time="5:52">Redux Video</li>
    <li data-time="5:49">Flexbox Video</li>
    <li data-time="8:57">Flexbox Video</li>
    <li data-time="11:29">Flexbox Video</li>
    <li data-time="3:07">Flexbox Video</li>
    <li data-time="5:59">Redux Video</li>
    <li data-time="3:31">Flexbox Video</li>
  </ul>

  <script>

    // Select all the list items on the page and convert to array
    const items = Array.from(document.querySelectorAll('[data-time]'));
    // returns a NodeList that doesn't have all the es6 methods
    // so we need to convert it to a true array so we wrap it in Array.from()
    console.log(items);

    // Filter for only the elements that contain the word 'flexbox'
    const filtered = items
      .filter(item => item.textContent.includes('Flexbox'))
      // map down to a list of time strings
      // we don't need the entire element, just the data-time attribute
      .map(item => item.dataset.time)
      // map to an array of seconds
      .map(timecode => {
        // convert returned array of strings to numbers
        const parts = timecode.split(':').map(part => parseFloat(part));
        // now return array of seconds
        // multiply the first row of minutes part[0] * 60 to get seconds
        // then add the remaining seconds from the second row parts[1]
        return (parts[0] * 60) + parts[1];
      })
      // reduce to get total
      .reduce((runningTotal, seconds) => runningTotal + seconds, 0);

    // 🔥 This can also be done in a single .reduce(), but we're practicing arrow functions here, so chain them!
    console.log(filtered);

  </script>
</body>

</html>
```

## es6.io: Exercise 2
---
### exercise 2.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Arrow Functions</title>
</head>

<body>

  <script>
    // 1. Given this array: `[3,62,234,7,23,74,23,76,92]`, use the array filter method and an arrow function to create an array of the numbers greater than `70`
    const numbers = [3, 62, 234, 7, 23, 74, 23, 76, 92];

    const large = numbers.filter(num => num > 70);
    console.log(large);

  </script>
</body>

</html>
```

# es6.io: 03. Template string
---

```javascript
// usual string concatenation
const sentence = 'My dog ' + 'name' + ' is ' + age * 7 + 'years old.';

// es6 template literal using backticks
const sentence = `My dog ${name} is ${age * 7} years old.`;
```

## Nicer formating

```javascript
const person = {
  name: 'Wes',
  job: 'Web Developer',
  city: 'Hamilton',
  bio: 'Wes is a really cool guy that loves to teach web development!'
};

const markup = `
  <div class="person">
    <h2>
      ${person.name}
      <span class="job">${person.job}</span>
    </h2>
    <p> class="location">${person.city}</p>
    <p class="bio">${person.bio}</p>
  </div>
`;

console.log(markup);
document.body.innerHTML = markup;
```

## Nesting looping template strings

```javascript
// what if we want to loop over and give
// a list item for each one?
const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'Hugo', age: 8 },
  { name: 'Sunny', age: 1 }
];

// while this works there is a better way
const markup = `
  <ul class="dogs">
    <li>${dogs[0].name}</li>
  </ul>
`;

// we want to return a string for each dog
// so after map we nest a template string
// inside a template string
// since map returns array we can use join
// to return it as a string
const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `
      <li>
        ${dog.name}
        is
        ${dog.age * 7}
      </li>`).join('')}
  </ul>
`;

document.body.innerHTML = markup;
```
## Conditional formating

```javascript
// what if we want to have the featuring artist
// instead of just a single artist?
const song = {
  name: 'Dying to live',
  artis: 'Tupac',
  featuring: 'Biggie Smalls'
};

// if there is a song with featuring
// then using the ternary operator and backticks
// we're going to display the featuring artist
// otherwise show nothing
const markup = `
  <div class="song">
    <p>
      ${song.name} - ${song.artist}
      ${song.featuring ? `(Featuring ${song.featuring}` : '')}
    </p>
  </div>
`;

document.body.innerHTML = markup;
```

## Template strings render functions

```javascript
// (1) What happens when your data starts to get complex?
const beer = {
  name: 'Belgian Wit',
  brewery: 'Steam Whistle Brewery',
  // (2) what if we want to implent this array of keywords
  // that's nested inside of the actual beer here?
  keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

// (4) react like render function
// this is going to take in the keywords
// and pass it to the map and return each keyword
// finally join will return the array as a string
function renderKeywords(keywords) {
  return `
    <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
    </ul>
  `;
}

// (3) we could just do a map but let's do a render function
const markup = `
  <div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.company}</p>
    ${renderKeywords(beer.keywords)}
  </div>
`;

document.body.innerHTML = markup;
```

## Tagged template literals
---
### tagged-templates.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Tagged Templates</title>
  <style>
    .hl {
      background: #ffc600;
    }
  </style>
</head>

<body>
  <script>
    // We can run this string through a function and rather
    // than the browser put in the variables for us we can
    // have control over how this actual string is made

    // When would this be useful? Let's first learn the mechanics
    // and how it all comes together

    // First we simply make a function
    // and take the name of the function we want to run
    // against the string and we put the name right in front
    // of the template

    // We can give it arguments such as strings, arg1, arg1 ,etc...
    // but we can use the es6 rest operator strings, ...values
    function highlight(strings, ...values) {
      // we can use debugger to stop our app
      // and observe the variables in dev tools
      // from the scope tab under sources
      // debugger;
      let str = '';
      strings.forEach((string, i) => {
        // give me the first value from the strings
        // and the first value from our values array
        // then add them together
        // strings is always going to be one larger than values
        // so when we get to the last one it returns undefined
        // we can check if values[i] is undefined and not add it
        // but we can use or trick which returns a blank string
        // if there is no values 
        // str += string + (values[i] || '');
        // let's for example highlight every variable
        str += `${string} <span contenteditable class="hl">${values[i] || ''}</span>`;
      });
      return str;
    }

    const name = 'Snickers';
    const age = 100;

    const sentence = highlight`My dog's name is ${name} and he is ${age} years old`;

    document.body.innerHTML = sentence;
    console.log(sentence);

  </script>
</body>

</html>
```
## Tagged templates dictionary
---
### tagged-templates-dictionary.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Tagged Templates</title>
  <style>
    abbr {
      border-bottom: 1px dotted grey;
    }
  </style>
</head>

<body>

  <div class="bio">

  </div>

  <script>
    // How do we get it so that when you hover
    // any of these variables if there is a dictionary
    // item for that variable that it will show up?
    // That's where we get a tagged template
    const dict = {
      HTML: 'Hyper Text Markup Language',
      CSS: 'Cascading Style Sheets',
      JS: 'JavaScript'
    };

    // In this it's going to be different
    // than the last one because we want to make
    // a new array of not just the values but
    // we want an array of values that if there's
    // an abbreviation we want it wrapped in a abbr
    function addAbbreviations(strings, ...values) {
      const abbreviated = values.map(value => {
        // we're going to check if there's a value in the dictionary
        if (dict[value]) {
          // if true return abbreviation tag
          return `<abbr title="${dict[value]}">${value}</abbr>`;
        }
        // if nothing is found just return value
        return value;
      });

      // finally we use reduce to build the string
      return strings.reduce((sentence, string, i) => {
        // take the existing sentence whatever
        // it was from the last iteration
        return `${sentence}${string}${abbreviated[i] || ''}`;
      }, '');
    }

    const first = 'Wes';
    const last = 'Bos';

    const sentence = addAbbreviations`Hello my name is ${first} ${last} and I love to code ${'HTML'}, ${'CSS'}, ${'JS'}`;

    const bio = document.querySelector('.bio');
    // create our p element
    const p = document.createElement('p');
    // set it's inner value
    p.innerHTML = sentence;
    // append it
    bio.appendChild(p);

  </script>
</body>

</html>
```
## Tagged templates sanitize
---
### tagged-templates-sanitize.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Tagged Templates</title>

  <style>
    abbr {
      border-bottom: 1px dotted grey;
    }
  </style>
</head>

<body>

  <div class="bio">

  </div>
  <!-- dompurify is a library used to sanitize html -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/0.8.2/purify.min.js"></script>
  <script>
    // let's create a sanitized tagged template
    // and use the dompurify library
    function sanitize(strings, ...values) {
      const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
      return DOMPurify.sanitize(dirty);
    }

    const first = 'Wes';
    // if this ran it would let the user run javascript on our page
    // then they could do malicious activity
    // this is otherwisek nows as XXS or cross-site scripting
    // the solution to this is to sanitize our html
    const aboutMe = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;

    const html = sanitize`
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;

    const bio = document.querySelector('.bio');
    bio.innerHTML = html;
  </script>
</body>

</html>
```

# es6.io: 04. String methods
---

```javascript
const course = 'RFB2';
const flightNumber = '20-AC2018-jz';
const accountNumber = '825242631RT0001';

const make = 'BMW';
const model = 'x5';
const colour = 'Royal Blue';

// .startsWith()
course.startsWith('RFB');
// returns false because it's case-sensitive
course.startsWith('rfb');
// skip characters
flightNumber.startsWith('AC', 3);

// .endsWith()
flightNumber.endsWith('jz');
// take the first x number of characters and ignore the rest
accountNumber.endsWith('RT', 11);

// .includes()
// check if x string is anywhere in it
flightNumber.includes('AC');

// .repeat()
// useful for something like a left-pad function
function leftPad(str, length = 20) {
  return `→ ${' '.repeat(length - str.length)}${str}`;
}

console.log(leftPad(make));
console.log(leftPad(model));
console.log(leftPad(colour));
```

# es6.io: 05. Destructuring
---

```javascript
// Destructuring is a JavaScript expression
// that allows us to extract data from arrays, object, maps and sets
// into their own variables
const person = {
  first: 'Wes',
  last: 'Bos',
  country: 'Canada',
  city: 'Hamilton',
  twitter: '@wesbos'
};

// sometimes you need to have top level variables
const first = person.first;
const last = person.last;

// instead of doing that we could do...
// this is not a object or block, it's the destructuring syntax
// this is saying give me a variable first and a variable last
// and take it from person
// outputing first would show "Wes" and last would show "Bos"
const { first, last, twitter } = person;

// let's look at some nested data
// something we would get back from an api
const wes = {
  first: 'Wes',
  last: 'Bos',
  links: {
    social: {
      twitter: 'https://twitter.com/wesbos',
      facebook: 'https://facebook.com/wesbos.developer',
    },
    web: {
      blog: 'https://wesbos.com'
    }
  }
};

// we could do something like...
const twitter = wes.links.social.twitter;
const facebook = wes.links.social.facebook;

// but we could just use destructuring
const { twitter, facebook } = wes.links.social;

// another use case which would be renaming variables
// when there are conflicting variable names
const { twitter: tweet, facebook: fb } = wes.links.social;

// ability to set defaults
// let's say we have a function that will do some animation
// on our page and it's going to create a element and style it for us
// but...the thing that we're building also require a height, fontSize
// how do we deal with them when they're not in there?
// before you would have a defaults settings object
// and then you would merge it with the settings one
// but with es6 it's different by using destructuring
// and setting a default value
const settings = { width: 300, color: 'black' }
const { width = 100, height = 100, color = 'blue', fontSize = 25 } = settings;
```
## Destructuring arrays

```javascript
const details = ['Wes Bos', 123, 'wesbos.com'];
// we could do something like this
const name = details[0];
const name = details[1];
const name = details[2];
// but destructuring is better
// useful with index based stuff, comma seperated list or string
const [name, id, website] = details;
// returns Wes Bos 123 wesbos.com
console.log(name, id, website);

const data = 'Basketball, Sports, 90210, 23';
// destructure data from a split array
const [itemName, category, sku, inventory] = data.split(',');
// returns Basketball Sports 90210 23
console.log(itemName, category, sku, inventory);
// what happens if the data is not great?
const data = 'Basketball, Sports, 90210, 23, wes, bos, cool';
// it will just throw them out
console.log(itemName, category, sku, inventory);

// but sometimes you want to get the rest of them
const team = ['Wes', 'Harry', 'Sarah', 'Keegan', 'Riker'];
// how would we destructure it into captain, assistant and then the rest?
// we use the rest operator ...
const [captain, assistant, ...player] = team;
// where players is the array of everything that is left
console.log(captain, assistant, ...players);
```

## Destructuring in action

```javascript
// Destructuring isn't just when you want to grab
// variables out of an object or array

// We're building a wrestling application
let inRing = 'Hulk Hogan';
let onSide = 'The Rock';
// what happens when they need to switch?
// you used to do this and then remove the tmp variable
var tmp = inRing;
inRing = onSide;
onSide = tmp;
// but with destructuring we can just swap them
console.log(inRing, onSide);
[inRing, onSide] = [onSide, inRing]
console.log(inRing, onSide);
```

## Destructuring and functions

```javascript
function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    GPB: amount * 0.53,
    AUD: amount * 1.01,
    MEX: amount * 13.30
  };
  return converted;
}

const hundo = convertCurrency(100);

console.log(hundo.AUD);
console.log(hundo.MEX);

// you can't return multiple values
// but you can can return a object
// and destructure the answer
const { USD, GPB, AUD, MEX } = convertCurrency(100);
// we should be able to take those values
// and log them individually
console.log(USD, GPB, AUD, MEX);

// how to make arguments order independant?
// wraping the arguments in curly brackets means
// that if we pass in an object it's going to destructure
// them into three variables available inside this function 
function tipCalc({ total, tip = 0.15, tax = 0.13 } = {}) {
  return total + (tip * total) + (tax * total);
}

// the order doesn't matter
// if no argument is passed we need to
// give the function a default itself
const bill = tipCalc({ tip: 0.20, total: 200 });
console.log(bill);
```
# es6.io: 06. for...of
---

## Shortcomings of existing loops

```javascript
// for...in is going to show this
Array.prototype.shuffle = function () {
  var i = this.length, j, temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

// for...in is going to show this
cuts.shop = 'MM Meats'

// (1) classic for loop
// downside: confusing syntax, doesn't read nice
for (i = 0; i < cuts.length; i++) {
  console.log(cuts[i]);
}

// (2) forEach loop
// downside: can't abort loop, can't skip one of the ones
cuts.forEach(cut => {
  console.log(cut);

  // doesn't work
  if(cut === 'Brisket') {
    break;
  }
});

// (3) for...in loop
// downside: anytime you add a property, method or anything
// to the array it's also going to show up
for (const index in cuts) {
  console.log(cuts[index]);
}

// (4) for...of loop
// best of all three worlds and you can use it for any type of data
// except objects
for (const cut of cuts) {
  // you're able to use break or continue
  if (cut === 'Brisket') {
    break;
  }
  console.log(cut);
}
```

## for...of examples
---
### for-of-examples.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Iterables & Looping</title>
</head>

<body>
  <p>Hi I'm p 01</p>
  <p>Hi I'm p 02</p>
  <p>Hi I'm p 03</p>
  <p>Hi I'm p 04</p>
  <p>Hi I'm p 05</p>
  <p>Hi I'm p 06</p>
  <p>Hi I'm p 07</p>
  <p>Hi I'm p 08</p>
  <p>Hi I'm p 09</p>
  <p>Hi I'm p 10</p>
  <script>
    const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

    // (1) What if we want to get the index
    // of the actual cut as well?

    // calling cuts.entries() would return a Array Iterator
    // but it's empty, all we know that there is a next() function we can call
    // and we could iterate through each one manually meat.next()
    for (const cut of cuts) {
      console.log(cut);
    }
    // Why is this useful to us?
    // if we iterate not just over the plain array
    // but if we iterate over the aray iterator
    // we get cut back as an array
    for (const cut of cuts.entries()) {
      console.log(cut);
    }
    // we can immediately destructure it
    for (const [i, cut] of cuts.entries()) {
      console.log(`${cut} is the ${i + 1} item`);
    }

    // (2) Another example where for...of is useful
    // when we don't know how many arguments there will be
    function addUpNumbers() {
      // arguments is a special word and it's going to give us all the arguments
      // we could convert it to an array or loop over it with for...of
      console.log(arguments);

      let total = 0;
      for (const num of arguments) {
        total += num;
      }
      console.log(total);
      return total;
    }

    addUpNumbers(10, 23, 52, 34, 12, 13, 123);

    // (3) Iterate over a string
    const name = 'Wes Bos';
    for (const char of name) {
      console.log(char);
    }

    // (4) Loop over DOM collections (nodeList, HTMLCollection)
    // without having to convert to a true array
    // they are being changed so that they work with Array Methods
    const ps = document.querySelectorAll('p');
    for (const p of ps) {
      p.addEventListener('click', function() {
        console.log(this.textContent);
      });
    }

  </script>
</body>

</html>
```

## for...of object

```javascript
// A plain object is not a iterable
// What are our options?
// We're going to be able to use entries() against an object in ES 2017
// and we can already polyfill
// But what are our other options?
// We can use Object.keys()
const apple = {
  color: 'Red',
  size: 'Medium',
  weight: 50,
  sugar: 10
};

// this won't work
for (const prop of apple) {
  console.log(prop);
}

// works with a polyfill
for (const prop of apple.entries()) {
  console.log(prop);
}

// take an object and return an array of all of the keys
for (const prop of Object.keys(apple)) {
  // get the value from the keys
  const value = apple[prop];
  console.log(value, prop);
}

// similar solution without having to use Object.keys()
for (const prop in apple) {
  const value = apple[prop];
  console.log(value, prop);
}
```

# es6.io: 07. Array.from(), of(), find(), findIndex(), some(), every()

## Array.from() and Array.of()
---
### Array-from-and-of.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Array .from() and .of()</title>
</head>

<body>
  <div class="people">
    <p>Wes</p>
    <p>Kait</p>
    <p>Snickers</p>
  </div>

  <script>
    // Both .from() and .of() are not on the Prototype but the Array itself
    // Array.from() will take something like a DOM Element Object and turn it into an Array
    const people = document.querySelectorAll('.people p');
    // log would return a NodeList
    console.log(people);
    // map wouldn't work because it's not an array
    const names = people.map(person => person.textContent);
    // so we have to use Array.from() to turn it into an array
    const peopleArray = Array.from(people);
    // log returns array
    console.log(peopleArray);
    // now map works
    const names = peopleArray.map(person => person.textContent);

    // we can do this in one go instead of two lines
    // Array.from() takes a second argument which is a map function
    // let's do it in a couple of lines so it's nice and visible
    const people = document.querySelectorAll('.people p');
    const peopleArray = Array.from(people, person => {
      return person.textContent;
    });

    console.log(peopleArray);

    // We can convert an arguments object into an array
    function sumAll() {
      // perfect use case for reduce
      // but...doesn't work, arguments is Object
      // return arguments.reduce((prev, next) => prev + next, 0);

      // much better 👍
      const nums = Array.from(arguments);
      return nums.reduce((prev, next) => prev + next, 0);
    }

    sumAll(2, 34, 23, 234, 234234, 234234, 2342);

    // Array.of() is going to create an array from every single element you pass it
    const ages = Array.of(12, 4, 23, 62, 34);
    
    console.log(ages);

  </script>
</body>

</html>
```
## Array.find() and Array.findIndex()

```javascript
// Common use case when you have some sort of data that comes back from an api
// This is some Instagram data
const posts = [
  {
    "code": "BAcyDyQwcXX",
    "caption": "Lunch #hamont",
    "likes": 56,
    "id": "1161022966406956503",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
  },
  {
    "code": "BAcJeJrQca9",
    "caption": "Snow! ⛄️🌨❄️ #lifewithsnickers",
    "likes": 59,
    "id": "1160844458347054781",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg"
  },
  {
    "code": "BAF_KY4wcRY",
    "caption": "Cleaned my office and mounted my recording gear overhead. Stoked for 2016!",
    "likes": 79,
    "id": "1154606670337393752",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e35/923995_1704188643150533_1383710275_n.jpg"
  },
  {
    "code": "BAPIPRjQce9",
    "caption": "Making baby pancakes for one early rising baby. ☕️🍴",
    "likes": 47,
    "id": "1157179863266871229",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12407480_1654828594805097_152207166_n.jpg"
  },
  {
    "code": "hZh6IQcfN",
    "caption": "New Stickers just came in. I'll do another mailing in a few weeks if you want some. #javascript",
    "likes": 66,
    "id": "1126293663140399053",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/11875511_1562439187344831_813588280_n.jpg"
  },
  {
    "code": "B3eiIwcYV",
    "caption": "Tacos for breakfast. I love you Austin. 🇺🇸",
    "likes": 33,
    "id": "1117418173361145365",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/11917950_927755223968499_1198055371_n.jpg"
  },
  {
    "code": "BAhvZrRwcfu",
    "caption": "Tried poke for the first time at @pokehbar. Delicious! It's like a bowl of sushi",
    "likes": 30,
    "id": "1162418651480049646",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/e35/12501993_1504179163220771_2060674913_n.jpg"
  },
  {
    "code": "BAAJqbOQcW5",
    "caption": "Brunchin'",
    "likes": 40,
    "id": "1152964002473690553",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/1516572_445736812276082_2116173059_n.jpg"
  },
  {
    "code": "_4jHytwcUA",
    "caption": "2015 can be summed up with one baby and a many lines of code. And sometimes a coding baby. 👶🏼⌨",
    "likes": 62,
    "id": "1150824171912152320",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/10723795_1149927178351091_1859033096_n.jpg"
  },
  {
    "code": "_zbaOlQcbn",
    "caption": "Lekker Chocoladeletter",
    "likes": 52,
    "id": "1149382879529256679",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12346073_1035047523184672_768982339_n.jpg"
  },
  {
    "code": "_rmvQfQce8",
    "caption": "Just discovered the #hamont farmers market has a new ramen place! 🍜",
    "likes": 35,
    "id": "1147180903383025596",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12331739_1671776806423597_995664526_n.jpg"
  },
  {
    "code": "_ep9kiQcVy",
    "caption": "⛄️",
    "likes": 64,
    "id": "1143535906423162226",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12354078_447337935474115_1484398925_n.jpg"
  },
  {
    "code": "_XpJcrwcSn",
    "caption": "6 page spread on flexbox in this months netmag!",
    "likes": 74,
    "id": "1141561999742846119",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12362588_1688046211438811_1395882545_n.jpg"
  },
  {
    "code": "_KnU7MwceA",
    "caption": "Hanging out in my office waiting for 5:00 beers to come around.",
    "likes": 54,
    "id": "1137894817632733056",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12301208_1533749386944985_1334730917_n.jpg"
  },
  {
    "code": "_HMejJQcY5",
    "caption": "Today I learned that a long pull espresso is called a 'lungo'",
    "likes": 18,
    "id": "1136932306813044281",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12357319_493317964181479_310198908_n.jpg"
  },
  {
    "code": "_Fq2zmwcaz",
    "caption": "Awesome hand lettered gift from @eunibae and the HackerYou crew.",
    "likes": 48,
    "id": "1136502965197194931",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12317458_1692845870986430_331905833_n.jpg"
  },
  {
    "code": "_A2r0aQcfD",
    "caption": "Some serious hardware meet JavaScript hacks going down this week at hackeryou. Excited for demo day!",
    "likes": 57,
    "id": "1135147611821557699",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12276809_750065668431999_184252508_n.jpg"
  },
  {
    "code": "1rhFawccs",
    "caption": "Some major audio upgrades coming to my next videos 😍",
    "likes": 39,
    "id": "1132002270913873708",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12331333_1650987978502155_1162510634_n.jpg"
  },
  {
    "code": "pjx-gQcVi",
    "caption": "My baby and me. Thanks to @bearandsparrow for this one.",
    "likes": 81,
    "id": "1128590547628442978",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12298962_863814057068027_460827278_n.jpg"
  },
  {
    "code": "oTZ0zQcWt",
    "caption": "It's too early. Send coffee.",
    "likes": 81,
    "id": "1128237044221461933",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12328347_990748230999662_1512917342_n.jpg"
  },
  {
    "code": "mxKQoQcQh",
    "caption": "They both have figured it out. #lifewithsnickers",
    "likes": 47,
    "id": "1127804966031967265",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-15/e35/12256736_1758525004381641_1136705181_n.jpg"
  },
  {
    "code": "fasqlQceO",
    "caption": "Kaitlin decorated the house for the Christmas. So gezellig! #casabos",
    "likes": 46,
    "id": "1125735850454402958",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/12277581_1028556737218368_1184190781_n.jpg"
  },
  {
    "code": "VBgtGQcSf",
    "caption": "Trying the new Hamilton Brewery beer. Big fan.",
    "likes": 27,
    "id": "1122810327591928991",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12224456_175248682823294_1558707223_n.jpg"
  },
  {
    "code": "FpTyHQcau",
    "caption": "I'm in Austin for a conference and doing some training. Enjoying some local brew with my baby.",
    "likes": 82,
    "id": "1118481761857291950",
    "display_src": "https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/11326072_550275398458202_1726754023_n.jpg"
  }
];

// Because it's an object we can't simply say posts.BAF_KY4wcRY or posts[BAF_KY4wcRY]
// because we don't have any keys to grab from an array, an array is always index based

const code = 'VBgtGQcSf';

// (1) find() is a calback where you return true of false until you find it
// we could find multiple using filter instead

// long way of doing it
const post = posts.find(post => {
  if (post.code === 'VBgtGQcSf') {
    return true;
  }
  return false;
});

// refactored 👍
const post = posts.find(post => post.code === code);

console.log(post);

// (2) findIndex() is helpful when you have the item you want
// but you want to know where in the array is it actually

// Let's say we want to delete one of these post
// and all we know is that we have the id
// We need to find out where in this is it so we can delete it

// long hand
const postIndex = posts.findIndex(post => {
  if (post.code === code) {
    return true;
  }
  return false;
});

// refactored 👍
// now that we have the index we can remove the post
const postIndex = posts.findIndex(post => post.code === code);

// log shows that it's post number 22
console.log(postIndex);
```

## Array.some() and Array.every()

```javascript
// They're not part of es6 but underused
// some() and every() will check the data in an array to check
// if some or all of the items meet what you're looking for

const ages = [32, 15, 19, 12];

// 👵👨 is there at least one adult in the group?
const adultPresent = ages.some(age => age >= 18);
// returns true
console.log(adultPresent);

// 🍻 is everyone old enough to drink?
const allOldEnough = ages.every(age => age >= 19);
// returns false
console.log(allOldEnough);
```

# es6.io: 08. ...Spread and ...Rest Operator
---

## Spread

```javascript
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

// It's going to take every single item from a iterable
// and apply it to the containing array

// (1) How to combine the two arrays?
// We can do something like this
const pizzas = featured.concat(specialty);
// this would work
console.log(pizzas);
// (2) What if we wanted to insert a value in the middle?
let pizzas = [];
pizzas = pizzas.concat(featured);
pizzas.push('veg');
pizzas = pizzas.concat(specialty);
console.log(pizzas);
// (3) This quickly becomes a headache so what we can do
// is take every single item in the array and ...spread it to a new array
const pizzas = [...featured, 'veg', ...specialty];
// (4) What if you want to copy an array?
// You could do something like this but it's not immutable
// meaning if we change fridayPizza we will overwrite pizzas
// We didn't copy the array, we just referenced it
const fridayPizzas = pizzas;
// What you had to do was
const fridayPizza = [].concat(pizzas);
// but with ...spread it's simpler
// now you have a new fresh 🍕 array
const fridayPizza = [...pizzas];

const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};
```
## Spread exercise
---
### jumping-letters.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>The ...Spread Operator</title>
  <style>
    body {
      min-height: 100vh;
      font-family: sans-serif;
      background: #ffc600;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      color: white;
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
    }

    .jump span {
      display: inline-block;
      transition: transform 0.2s;
      cursor: url('http://csscursor.info/source/santahand.png'), default;
    }

    .jump span:hover {
      transform: translateY(-20px) rotate(10deg) scale(2);
    }
  </style>
</head>

<body>
  <h2 class="jump">SPREADS!</h2>

  <script>
    const heading = document.querySelector('.jump');
    heading.innerHTML = sparanWrap(heading.textContent);

    function sparanWrap(word) {
      return [...word].map(letter => `<span>${letter}</span>`).join('');
    }
  </script>
</body>

</html>
```

## More spread examples
---
### more-spread-examples.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Spread Examples</title>
</head>

<body>
  <div class="people">
    <p>Wes</p>
    <p>Kait</p>
    <p>Randy</p>
  </div>

  <script>
    // (1) One use case for ...spread is an alternative to Array.from()
    const people = [...document.querySelectorAll('.people p')];
    // people are now a proper array
    console.log(people);
    // map now works
    const names = people.map(person => person.textContent);

    const deepDish = {
      pizzaName: 'Deep Dish',
      size: 'Medium',
      ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
    };

    // (2) When you want to create a new array off of a property from a object
    const shoppingList = ['Milk', 'Flour', ...deepDish.ingredients];
    // this is a true copy, not a reference
    console.log(shoppingList);

    // (3) When you have an array of objects
    // and you need to remove one of those objects
    // from the array
    const comments = [
      { id: 209384, text: 'I love your dog!' },
      { id: 523423, text: 'Cuuute! 🐐' },
      { id: 632429, text: 'You are so dumb' },
      { id: 192834, text: 'Nice work on this wes!' },
    ];

    const id = 632429;
    const commentindex = comments.findIndex(comment => comment.id === id);
    console.log(commentindex);

    // we want everything before the mean comment
    // and everything after the mean comment
    // but...we get back an array of arrays
    // we want an array of comment objects
    // so what we can do is use ...spread
    const newComments = [...comments.slice(0, commentindex), ...comments.slice(commentindex + 1)];
    // now get back an array of objects
    console.log(newComments);
  </script>
</body>

</html>
```

## Spreading into a function

```javascript
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];

// (1) We want to join the two arrays but we get a nested array
// with only push so we we can do push.apply with inventors passed in as this
// and this works because when you call apply it's gonnna run the function
// that you called apply against but as every single item of the array as an argument
inventors.push.apply(inventors, newInventors);
console.log(inventors);
// but you can just ...spread it into a function
inventors.push(...newInventors);
console.log(inventors);

// (2) Let's take this example
const name = ['Wes', 'Bos'];

function sayHi(first, last) {
  alert(`Hey there ${first} ${last}`);
}
// you could do this
// but it doesn't work that well if it gets more complex
sayHi(name[0], name[1]);
// so instead we could just ...spread the array
sayHi(...name)
```

## Rest param

```javascript
// Opposite of ...spread
// If a spread param takes one thing and unpacks it into multiple items
// the rest param takes multiple things and packs it into a single array

// (1) We don't know how many currencies will the person pass
// so we can use ...rest
function convertCurrency(rate, tax, tip, ...amounts) {
  console.log(rate, tax, tip, amounts);
  return amounts.map(amount => amount * rate);
}

// imagine these are in dollars
const amounts = convertCurrency(1.54, 10, 23, 52, 1, 56);
console.log(amounts);

// (2) Let's say we have an array of data that came from a jogging application
const runner = ['Wes Bos', 123, 5.5, 5, 3, 6, 35];
// we want to destructure this data assuming the first item will be the name,
// the second the runner id and the rest of the items log of runs
const [name, id, ...runs] = runner;
console.log(name, id, runs);

// (3) Team example
const team = ['Wes', 'Kait', 'Lux', 'Sheena', 'Kelly'];
const [captain, assistant, ...players] = team;
console.log(captain, assistant, players);
```

# es6.io: 09. Object Literal Upgrades
---

```javascript
const first = 'snickers';
const last = 'bos';
const age = 2;
const breed = 'King Charles Cav';
// (1) If the property name and the variable you're setting it to
// are named the exact same thing you can just use the name
const dog = {
  firstName: first,
  last,
  age,
  breed,
  pals: ['Hugo', 'Sunny']
};

console.log(dog);

// (2) Method defintions inside of an object
// We can leave out the colon and the function keyword
// and it would be the same thing
const modal = {
  create(selector) {

  },
  open(content) {

  },
  close(goodbye) {

  }
}

// (3) Computed property names
function invertColor(color) {
  return '#' + ("000000" + (0xFFFFFF ^ parseInt(color.substring(1), 16)).toString(16)).slice(-6);
}

const key = 'pocketColor';
const value = '#ffc600';

// How would we make a key of color opposite?
// We need to compute the copy
// Previously you had to make the object and then update it
// but now we can do it inside our object literal
const tShirt = {
  [key]: value,
  [`${key}Opposite`]: invertColor(value)
}

console.log(tShirt);

// (4) Funky data from an API
// What if we want to pair these values?
const keys = ['size', 'color', 'weight'];
const values = ['medium', 'red', '100'];

const shirt = {
  // size: medium
  [keys.shift()]: values.shift(),
  // color: red
  [keys.shift()]: values.shift(),
  // weight: 100
  [keys.shift()]: values.shift()
}

console.log(shirt);
```

# es6.io: 10. Promises
---

```javascript
// Promise is something that will happen in the future but not immediately
// JavaScript is totally asynchronous

// fetch the data from the url
// this will queue it up and return a promise
const postsPromise = fetch('https://wesbos.com/wp-json/wp/v2/posts');
// we can then listen to it
// it will only run when the data successfully comes back
// and it returns data
// but we need to return it as json
// so we get the actual post data
// you can chain .thens together and put it on their own line
// for readabilities sake
// if there's an error we can use .catch at the end
postsPromise
  .then(data => data.json())
  .then(data => { console.log(data) })
  .catch(err => console.error(err))
```

## Creating promises

```javascript
// It all boils down to I don't want to stop JavaScript from running,
// I just want to start this thing and when it comes back deal with the result

// create a variable and store a new promise inside of it
// it accepts resolve and reject as parameters
const p = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('Wes is cool');        
  // }, 1000);

  setTimeout(() => {
    // wrapping it in a error object shows where it happened
    reject(Error('Err wes isn\'t cool'));
  }, 1000);
});

p
  // one second later the message pops up      
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

## Chaining promises

```javascript
// Another useful case for promises is when you need some flow control
// Example when querying a database using Node.js

// Imagine these two are a database and we'll simulate ourselves
// connecting to a database which won't be accessible to us immediately
// which is why we're gonna use promises
const posts = [
  { title: 'I love JavaScript', author: 'Wes Bos', id: 1 },
  { title: 'CSS!', author: 'Chris Coyier', id: 2 },
  { title: 'Dev tools tricks', author: 'Addy Osmani', id: 3 },
];

const authors = [
  { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
  { name: 'Chris Coyier', twitter: '@chriscoyier', bio: 'CSS Tricks and CodePen' },
  { name: 'Addy Osmani', twitter: '@addyosmani', bio: 'Googler' },
];

// We're gonna create two seperate functions that return promises
// and then chain them together
function getPostById(id) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // we'll use setTimeout just to simulate it taking time
    setTimeout(() => {
      // find the post we want
      const post = posts.find(post => post.id === id);

      if (post) {
        // send the post back
        resolve(post);
      } else {
        reject(Error('No Post Was Found!'));
      }
    }, 200)
  });
}

// Hydrating? xD
// This function will return a promise itself
// so if we return a promise inside of a .then
// it's going to allow us to chain a .then onto the next line
function hydrateAuthor(post) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // find the author
    const authorDetails = authors.find(person => person.name === post.author);
  
    if (authorDetails) {
      // "hydrate" the post object with the author object
      post.author = authorDetails;
      resolve(post);
    } else {
      reject(Error('Can not find the author'));
    }
  });
}

getPostById(2)
  .then(post => {
    return hydrateAuthor(post);
  })
  .then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  });
```

## Multiple promises

```javascript
// In some cases we want to fire promises at the same time
// because they're not dependant on each other

// (1) Unrelated promises
const weather = new Promise(resolve => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds' });
  }, 2000);
});

const tweets = new Promise(resolve => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

// Pass it in an array of promises
// We're waiting for every single promise to be resolved
// before we run our .then
// Promise
//   .all([weather, tweets])
//   .then(responses => {
//     const [weatherInfo, tweetsInfo] = responses;
//     console.log(weatherInfo, tweetsInfo);
//   })

// (2) Let's do some with real data
const postsPromise = fetch('https://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

// We have this problem where we need to convert ReadableStream to JSON
// but how do you do that with multiple things?
Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    // The reason we can't use JSON.parse because
    // there are many different types of data that can come back
    // arrayBuffer, blob, json, text, formData
    return Promise.all(responses.map(res => res.json()));
  })
  .then(responses => {
    // The final promise is called and we can do whatever we want with the data
    console.log(responses);
  })
```

# es6.io: 11. Symbols
---

```javascript
// There's a 7th primitive type that's been added to JavaScript
// Number, String, Object, Boolean, Null, Undefined, Symbol
// Symbols are unique identifiers, they avoid us having naming collisions
// Any time you want to create a property in a unique way
// that's when you should reach for a symbol

// Wes is not a value, it's a descriptor, the symbol itself is just a identifier
const wes = Symbol('Wes');
const person = Symbol('Wes');

// Useful when creating an object of your class
const classRoom = {
  [Symbol('Mark')]: { grade: 50, gender: 'male' },
  [Symbol('Olivia')]: { grade: 80, gender: 'female' },
  [Symbol('Olivia')]: { grade: 80, gender: 'female' },
};

// Symbols are not inumerable which means we can not loop over them
for (person in classRoom) {
  // nothing will be shown
  console.log(person);
}

// If you want to access a value
const syms = Object.getOwnPropertySymbols(classRoom);
// but there's no actual data, so how do we get it?
console.log(syms)
// We can get it with map
const data = syms.map(sym => classRoom[sym]);
console.log(data);
```

# es6.io: 12. ESLint
---

```shell
# install ESLint
npm install -g eslint
```

##  .eslintrc config
```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
  }
}
```

## Airbnb ESlint settings

[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

```shell
# It's helpful to have a global .eslintrc file
# if you do not have a eslint file present anywhere
# so it uses it as default

# It lives in your home directory
# Windows ~ C:\Users\UserName
```

```shell
# run this for correct version
npm info "eslint-config-airbnb@latest" peerDependencies

# npm 5+ shortcut local install
npx install-peerdeps --dev eslint-config-airbnb

# global install
npm install -g eslint-config-airbnb eslint-plugin-jsx-a11y@^6.0.3 eslint-plugin-import eslint-plugin-react
```

```shell
# check for errors
eslint bad-code.js

# fix errors
eslint bad-code.js --fix
```

## Line and file specific settings

```javascript
// Sometimes we want eslint to be specifc to a file
// or lines we're working with, sometimes you have a
// external library that's introducing global variables

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
```

## ESLint plugins

[A list of awesome ESLint plugins, configs, etc.](https://github.com/dustinspecker/awesome-eslint)

```shell
# linting for html
npm install -g eslint-plugin-html
```

```shell
# linting for markdown
npm install -g eslint-plugin-markdown
```

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
  },
  "plugins": ["html", "markdown"]
}
```

## ESLint inside VS Code

Install ESLint extension and you're done 👍

## Only allow passed ESLint code into your git repo

```shell
# git hooks - code that runs before things happen
# .git/hooks/commit-msg

#!/bin/bash
files=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
  exit 0
fi

failed=0
for file in ${files}; do
  git show :$file | eslint $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed, git commit denied!"
  exit $failed
fi
```

# es6.io: 13. JavaScript Modules
---

1. First Install your dependencies:

```bash
npm install webpack babel-loader babel-core babel-preset-es2015-native-modules --save-dev
```

2. Then, Create a `webpack.config.js` file:

```js
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './app.js'
  },
  output: {
    path:  path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-native-modules']
        }
      }
    ]
  },
  plugins: [
    // uglify js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { warnings: true },
        output: { comments: false },
      },
      sourceMap: true
    }),
    // env plugin
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
};
```

3. Setup the build npm script in `package.json`:

```json
"build": "webpack --progress --watch"
```

## Creating your own modules

app.js
```javascript
// app.js
// this is not a node module but a local file
// so we start it with a relative path
// it's not necessary to include file name extensions
// default export we can name it anything we want
// unlike named export that we also need to wrap in {...}
import { apiKey as key, url, sayHi, old, dog } from './src/config';

// we won't see the value until we export it
console.log(apiKey);

sayHi('Wes');
```

config.js
```javascript
const apiKey = 'abc123';

// named export
export const apiKey = 'abc123';

// export variable
export const url = 'https:\\wesbos.com';

// export function
export function sayHi(name) {
  console.log(`Hello there ${name}`);
}

// export multiple things at once
const age = '100';
const dog = 'Snickers';

export { age as old, dog };

// default export
// export default apiKey;
```

## More ES6 module practice

app.js
```javascript
// config we already created
import { apiKey as key, url, sayHi, old, dog } from './src/config';

// user functions
import User, { createURL, gravatar } from './src/user';

// create new user
const wes = new User('Wes Bos', 'wesbos@gmail.com', 'wesbos.com');

// create url
const profile = createURL(wes.name);

// get the avatar
const image = gravatar(wes.email);

console.log(image);
```

user.js
```javascript
// import what we need
import slug from 'slug';
import { url } from './config';
import base64 from 'base-64';

// create user
export default function User(name, email, website) {
  return { name, email, website }
}

// create url
export function createURL(name) {
  return `${url}/users/${slug(name)}`;
}

// get the avatar
export function gravatar(email) {
  const hash = base64.encode(email);
  const photoURL = `https://www.gravatar.com/avatar/${hash}`;
  return photoURL;
}
```

# es6.io: 14. ES6 Tooling
---

## BrowserSync setup

1. Install BrowserSync
```shell
# init and skip questions
npm init -y
# install browser-sync and save as dev dependency
npm i browser-sync -D
```
2. Add a script to package.json
### package.json
```json
{
  "name": "systemjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "browser-sync start --directory --server --files '*.js, *.html, *.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.24.6"
  }
}
```

3. Start browser-sync
```shell
npm run server
```

There are other bundlers besides Webpack 🔥

SystemJS
+ works with jspm (JavaScript package manager)
+ not an alternative to npm, just sits on top of it
+ you can run it in the browser without any of the overhead

### index.html
```html
<!-- we include the jspm and run it through a server  -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>System JS</title>
</head>

<body>
  <!-- we include the jspm and run it through a server  -->
  <script src="https://jspm.io/system@0.19.js"></script>
  <script>
    // Configure SystemJS
    System.config({ transpiler: 'babel' });
    // Entry point
    System.import('./main.js');
  </script>
</body>

</html>
```

### main.js
```javascript
// go to npm's registry and import lodash
import { sum, kebabCase } from 'npm:lodash';
import { addTax } from './checkout';

console.log(kebabCase('Wes is soooo cool ⛓⛓⛓⛓'));

console.log(addTax(100, 0.15));
```

### checkout.js
```javascript
export function addTax(amount, taxRate) {
  return amount + (amount * taxRate);
}
```

## All about Babel + npm scripts

It's possible with Babel and polyfilling to get 99% of ES6 working across all the browsers.

[Babel is a JavaScript compiler.](https://babeljs.io/)

1. Install Babel
```shell
npm init -y

# babel-cli allows us to run babel in the command line
# but we're gonna do it using a npm script
# we also need a preset which is a collection of plugins
npm install babel-cli babel-preset-es2015

# installing plugins
npm install babel-plugin-transform-object-rest-spread
```

2. Add a script to package.js
### package.json
```json
{
  "name": "babel",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "babel": "babel app.js --watch --out-file app-compiled.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-es2015": "^6.24.1"
  },
  "babel": {
    "presets": [
      "es2015"
    ],
    "plugins": ["transform-object-rest-spread"]
  }
}
```

3. Run Babel
```shell
npm run babel
```

### app.js
```javascript
const age = 100;
const people = ['Wes', 'Kait'];

const fullNames = people.map(name => `${name} Bos`);
```

### app-compiled.js
```javascript
'use strict';

var age = 100;
var people = ['Wes', 'Kait'];

var fullNames = people.map(function (name) {
  return name + ' Bos';
});
```

## Polyfilling ES6 for older browsers

Babel only works on syntax.
There's a whole bunch of new methods where those things aren't included in Babel like Array.from().
Babel doesn't convert the method, it just assumes it's available on all of your arrrays.

In a situation like this you use a polyfill.
A polyfill says: "If the browser doesn't have it, we must recreate it with regular JavaScript."

[Babel polyfill](https://babeljs.io/docs/en/babel-polyfill) can do that for us but it might introduce code overhead. Good for multiple requests and including it all into one bundle.

[Polyfill.io](https://polyfill.io/v2/docs/) can give you just the polyfills you need, tailored to each browser.

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

# es6.io: 15. Classes
---

## Prototypal inheritance
```javascript
// Object constructor
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

// Prototype
Dog.prototype.bark = function() {
  console.log(`Bark Bark! My name is ${this.name}`);
}

Dog.prototype.cuddle = function() {
  console.log('I love you owner!');
}

// This form of code reuse is known as prototypal inheritance
const snickers = new Dog('Snickers', 'King Charles');
const sunny = new Dog('Sunny', 'Golden Doodle');
```

## ES6 Classes

```javascript
// Class expression
// const Dog = class { }

// Class declaration
class Dog {
  // Constructor
  constructor(name, bread) {
    this.name = name;
    this.breed = bread;
  }

  // Methods
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
  }

  cuddle() {
    console.log('I love you owner!');
  }

  // Static method
  static info() {
    console.log('A dog is better than a cat by 10 times');
  }

  // Getters and setters
  // Not a method but a computed property
  get description() {
    return `${this.name} is a ${this.breed} type of dog`;
  }

  set nicknames(value) {
    this.nick = value.trim();
  }
  
  get nicknames() {
    return this.nick.toUpperCase();
  }
}

const snickers = new Dog('Snickers', 'King Charles');
const sunny = new Dog('Sunny', 'Golden Doodle');
```

## Extending classes and using super()

```javascript
class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }

  drink() {
    this.thirst -= 10;
    return this.thirst;
  }

  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}

// Dog inherits everything from Animal
class Dog extends Animal {
  constructor(name, breed) {
    // call the thing you're extending first
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log('Bark bark I\'m a dog');
  }
}

const rhino = new Animal('Rhiney');
const snickers = new Dog('Snickers', 'King Charles');
```

## Extending arrays

```javascript
// Create class
class MovieCollection extends Array {
  // Constructor that takes in name and uses rest
  // for remaining arguments
  constructor(name, ...items) {
    // call Array and spread in items
    // equivalent of new Array(...items)
    super(...items);
    this.name = name;
  }

  // Add movie
  add(movie) {
    this.push(movie);
  }

  // Sort movies by rating
  topRated(limit = 10) {
    return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
  }
}

// Movies collection
const movies = new MovieCollection('Wes\'s Fav Movies',
  { name: 'Bee Movie', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'King of the Road', stars: 8 }
);

// Add a movie to the movies array
movies.add({ name: 'Titanic', stars: 5 });

// Show a table of top rated movies
console.table(movies.topRated());
```

# es6.io: 16. Generators
---

```javascript
// Currently in JavaScript when you run a function
// it runs top to bottom and it's done
// However with a generator function you can start, pause, stop
// indefinite amount of time
function* listPeople() {
  // yield returns a value until that function is called again
  // we iterate over it using next()
  // next().value if you don't care about the done status
  let i = 0;
  yield i;
  i++;
  yield i;
  i++;
  yield i;
}

// Invoke and store our function
const people = listPeople();

// Looping with a genereator
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 },
];

function* loop(arr) {
  for (const item of arr) {
    yield item;
  }
}

const inventorGen = loop(inventors);
```

## Using generators for Ajax flow control

```javascript
// One use for generators is the ability to do waterfall like Ajax requests
// /search/wes -> /user/123 -> /photo/456

function ajax(url) {
  fetch(url).then(data => data.json()).then(data => dataGen.next(data)) // (3)
}

// Clean code top to bottom without having to worry about callbacks or promises
function* steps() {
  console.log('fetching beers');
  const beers = yield ajax('http://api.react.beer/v2/search?q=hops&type=beer'); // (2) (4) returns data back to variable
  console.log(beers);

  console.log('fetching Wes');
  const wes = yield ajax('https://api.github.com/users/wesbos');
  console.log(wes);

  console.log('fetching Fat Joe');
  const fatJoe = yield ajax('https://api.discogs.com/artists/51988');
  console.log(fatJoe);
}

const dataGen = steps();
dataGen.next(); // (1)
```

## Looping generators with for...of

```javascript
function* lyrics() {
  yield `But don't tell my heart`;
  yield `My achy breaky heart`;
  yield `I just don't think he'd understand`;
  yield `And if you tell my heart`;
  yield `My achy breaky heart`;
  yield `He might blow up and kill this man`;
}

const achy = lyrics();

for (const line of achy) {
  console.log(line);
}
```

# es6.io: 17. Proxies
---

```javascript
// Proxies allow you to overwrite
// the default behaviour of an objects operations
const person = { name: 'Wes', age: 100 };
// Proxy takes a target and handler
// where you specify all the operations
// you wish to rewrite
const personProxy = new Proxy(person, {
  // set up traps
  get(target, name) {
    // console.log('Someone is asking for ', target, name);
    return target[name].toUpperCase();
  },
  set(target, name, value) {
    if (typeof value === 'string') {
      target[name] = value.trim().toUpperCase() + '✂';
    }
  }
});

personProxy.name = 'Wes';
```

## Another proxy example

```javascript
// Phone handler
const phoneHandler = {
  // set trap
  set(target, name, value) {
    // Clean phone number
    target[name] = value.match(/[0-9]/g).join('');
  },
  // get trap
  get(target, name) {
    // Consistenly formated phone number
    return target[name].replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
  }
}

// Phone number proxy
const phoneNumbers = new Proxy({}, phoneHandler);
```

## Using proxies to combat errors

```javascript
// Handler
const safeHandler = {
  set(target, name, value) {
    // Find all the like keys that are equal to the one
    // that the person is looking for but in lowercase
    const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase());

    // If there is no new property and there is a like key
    if (!(name in target) && likeKey) {
      // Throw error
      throw new Error(`Oops! Looks like we already have a ${name} property but with the case of ${likeKey}.`);
    }
    // If that doesn't happen set the key for them
    target[name] = value;
  }
}

// New saftey object
const saftey = new Proxy({ id: 100 }, safeHandler);

// This should show an error because ID ❌ id
// and that would mean a new property
saftey.ID = 200;
```

# es6.io: 18. Sets
---

```javascript
// A Set in JavaScript is like a unique array
// meaning that you can only add the same item once
// with a nice API for managing the items inside of it
// You can't access the items individually and it's not index based
// Because it's index based length doesn't work but size does

// Create a new Set by storing it in a variable
const people = new Set();
// Add items to a Set
people.add('Wes');
people.add('Snickers');
people.add('Kait');
// Remove items from a Set
people.delete('Wes');
// Clear entire Set
people.clear();

// SetIterator
const it = people.values();
// means it's a generator so we can loop over it
it.next();

// Feed it to a for...of loop
for (const person of people) {
  console.log(people);
}

// Set also has methods of keys and entries
people.keys(); // same as values
people.entries(); // so the API is same as Map

// Create values inside new Set
const students = new Set(['Wes', 'Kara', 'Tony']);

// We can pass an existing array to our Set
const dogs = ['Snickers', 'Sunny'];
const dogSet = new Set(dogs);

// Use has to see if someone is in a Set
students.has('Tony');
```

## Brunch with sets

```javascript
const brunch = new Set();
// As people start coming in
brunch.add('Wes');
brunch.add('Sarah');
brunch.add('Simone');
// Ready to open!
const line = brunch.values();
console.log(line.next().value);
console.log(line.next().value);

// More people
brunch.add('Heather');
brunch.add('Snickers');
// line will remove itself from the setIterator
// where as the Set is the gold list of everyone that has currently went through it
// even if they were added after the fact of creating the Set and the line
console.log(line.next().value);
console.log(line.next().value);
console.log(line.next().value);
```

## WeakSet

```javascript
// WeakSet is like a Set except there are a number of limitations
// or benefits in some situations

let dog1 = { name: 'Snickers', age: 3 };
let dog2 = { name: 'Sunny', age: 1 };

// Same as before, passing it an iterable of items
// WeakSet can only contain Objects, no strings, numbers, array or anything else
// and you can't inumerate or loop over it
// WeakSet cleans itself up (garbage collection in memory) so there's no clear method
// When the reference to one of these dogs no longer exists
// it will automatically be taken out of our WeakSet (garbage collected)
const weakSauce = new WeakSet([dog1, dog2]);

console.log(weakSauce);
dog1 = null;
console.log(weakSauce);
```

# es6.io: 19. Maps
---

```javascript
// If Sets are to Arrays then Maps are to Objects
// Map works similar to Set but has a key in a value instead of just values

// Create new Map
const dogs = new Map();

// The keys and the values can be anything
dogs.set('Snickers', 3);
dogs.set('Sunny', 2);
dogs.set('Hugo', 10);

// You can check if it has the item
dogs.has('Snickers');

// You can get the item
dogs.get('Snickers');

// Remove item
dogs.delete('Hugo');

// You can loop over them in two ways
dogs.forEach((val, key) => console.log(val, key));

for (const dog of dogs) {
  // Returns array where the first item is the key
  // and the second item is the value
  console.log(dog);
}

// Knowing that we can use destructuring
for (const [key, val] of dogs) {
  console.log(key, val);
}

// Clear the Map
dogs.clear();
```

## Map metadata with DOM node keys
---
### maps-metadata.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Maps!</title>
  <style>
    button {
      font-size: 50px;
      margin: 10px;
    }
  </style>
</head>

<body>

  <button>Snakes 🐍</button>
  <button>Cry 😂</button>
  <button>Ice Cream 🍦</button>
  <button>Flamin' 🔥</button>
  <button>Dancer 💃</button>

  <script>
    // One of the unique properties of a Map over a regular Object
    // is that you can use the Object as a key in a Map
    // meaning you can use it as something like a metadata dictionary
    // where you don't want to store the metadata on the Object but about it

    // Map of click counts
    const clickCounts = new Map();

    // Select all the buttons
    const buttons = document.querySelectorAll('button');

    // Loop over every button and add it to the Map
    buttons.forEach(button => {
      // Set the key and value of button
      clickCounts.set(button, 0);
      // Add event listener
      button.addEventListener('click', function() {
        // This is going to be equal to the button we're clicking
        const val = clickCounts.get(this);
        console.log(val);
        // Set the value, the key is going to be the button and the value incremented by 1
        clickCounts.set(this, val + 1);
        console.log(clickCounts);
      });
    });

  </script>
</body>

</html>
```

## WeakMap

```javascript
// WeakMap is like WeakSet

// Two objects
let dog1 = { name: 'Snickers' };
let dog2 = { name: 'Sunny' };

// Map and WeakMap
const strong = new Map();
const weak = new WeakMap(); // you can't get a size for a WeakMap

// Add item to each of the Maps
strong.set(dog1, 'Snickers is the best!');
weak.set(dog2, 'Sunny is the 2nd best!');

// In WeakMap the dog object is garbage collected
// but Map holds on to it causing a memory leak
dog1 = null;
dog2 = null;
```

# es6.io: 20. Async + Await
---

## Native promises review
---
### Native Promises Review.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Native Promises</title>
</head>

<video controls class="handsome"></video>

<body>
  <script>
    // fetch using promise
    fetch('https://api.github.com/users/wesbos')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err))

    // Get video tag
    const video = document.querySelector('.handsome');
    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(MediaStream => {
        // Put the webcam output in the video source
        video.srcObject = MediaStream
        // Start streaming it from the webcam
        video.load();
        video.play();
      })
      .catch(err => console.error(err))
  </script>
</body>

</html>
```

## Custom promises

```javascript
// Declare function breathe
function breathe(amount) {
  // Return new Promise
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    // Timer that will wait however long we pass it
    // and then log the message
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  })
}

// Chain them one after another with then
breathe(1000).then(res => {
  console.log(res);
  return breathe(500);
}).then(res => {
  console.log(res);
  return breathe(600);
}).then(res => {
  console.log(res);
  return breathe(200);
}).then(res => {
  console.log(res);
  return breathe(500);
}).then(res => {
  console.log(res);
  return breathe(2000);
}).then(res => {
  console.log(res);
  return breathe(250);
}).then(res => {
  console.log(res);
  return breathe(300);
}).then(res => {
  console.log(res);
  return breathe(600);
}).catch(err => {
  console.error(err);
  console.error('YOU SCHREWED UP');
})
```

## Async + Await

```javascript
// JavaScript is asynchronous meaning
// nothing in it will sit around, pause and wait
// all of JavaScript until it comes back
// That's what's reffered to as blocking in JavaScript

// Example of blocking
setInterval(() => console.log(Date.now()), 500)
// Alert would block setInterval from running
alert('Hi');

// Waiting for execution
// Async Await is built on top of Promises,
// it's not an alternative to them  
function breathe(amount) {
  // Return new Promise
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    // Timer that will wait however long we pass it
    // and then log the message
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  })
}

// Async arrow function
const go2 = async() => {
  // ...
}

// Async function
async function go() {
  console.log('start');
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
  console.log('end');
}

// Run function
go();
```

## Async + Await error handling

## try...catch
```javascript
function breathe(amount) {
  // Return new Promise
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    // Timer that will wait however long we pass it
    // and then log the message
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  })
}

// Async function
async function go() {
  // try...catch
  try {
    console.log('start');
    const res = await breathe(1000);
    console.log(res);
    const res2 = await breathe(300);
    console.log(res2);
    const res3 = await breathe(750);
    console.log(res3);
    const res4 = await breathe(900);
    console.log(res4);
    console.log('end');
  } catch (err) {
    console.error(err);
  }
}

// Run function
go();
```

## Higher order catch error function
```javascript
function breathe(amount) {
  // Return new Promise
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('That is too small of a value');
    }
    // Timer that will wait however long we pass it
    // and then log the message
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  })
}

// Higher order catch error function
function catchErrors(fn) {
  // Returns a function
  return function (...args) { // use ...rest to capture all arguments
    // Returns a function that runs with a catch
    return fn(...args).catch(err => console.error(err)); // ...spread the arguments
  }
}

// Async function
async function go(name, last) {
  console.log(`Starting for ${name} ${last}`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
  console.log('end');
}

// Wrap our go function
const wrappedFunction = catchErrors(go);
// Run wrapped function
wrappedFunction('Wes', 'Bos');
```

## Waiting on multiple promises

```javascript
// We want both to be done at the exact same time
// so we're storing the promise instead of the returned await result
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos').then(r => r.json());
  const p2 = fetch('https://api.github.com/users/stolinski').then(r => r.json());
  // Wait for both of them to come back
  const res = await Promise.all([p1, p2]); // returns a mega promise
  // Log
  console.log(res);
}

go();
```

```javascript
// We want both to be done at the exact same time
// so we're storing the promise instead of the returned await result
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  // Wait for both of them to come back
  const res = await Promise.all([p1, p2]); // returns a mega promise
  // Use map
  const dataPromises = res.map(r => r.json());
  // Get data
  const wesAndScott = await Promise.all(dataPromises);
  // Log
  console.log(wesAndScott);
}

go();
```

```javascript
// We want both to be done at the exact same time
// so we're storing the promise instead of the returned await result
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  // Wait for both of them to come back
  const res = await Promise.all([p1, p2]); // returns a mega promise
  // Use map
  const dataPromises = res.map(r => r.json());
  // Destructure the values
  const [wes, scott] = await Promise.all(dataPromises);
  // Log
  console.log(wes, scott);
}

go();
```

```javascript
// Get data function
async function getData(names) {
  // Call fetch for each name using map
  const promises = names.map(name => fetch(`https://api.github.com/users/${name}`).then(r => r.json()));
  // Await all the promises
  const people = await Promise.all(promises);
  // Log
  console.log(people);
}

// Passing in GitHub names
getData(['wesbos', 'stolinski', 'darcyclarke']);
```

## Promisifying callback based functions

```javascript
// Promisify existing function
navigator.geolocation.getCurrentPosition(function (pos) {
  console.log('It worked!');
  console.log(pos);
}, function (err) {
  console.log('It failed!');
  console.log(err);
});

function getCurrentPosition(...args) { // ...rest to capture arguments
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(...args, resolve, reject); // ..spread in arguments
  });
}

async function go() {
  const pos = await getCurrentPosition(); // someone could pass a options object to be passed along
  console.log(pos);
}

go();
```

# es6.io: 21. New, Future and Experimental Langauge Additions
---

## Class properties

```javascript
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  // Same as declaring
  // this.barks = barks in the constructor
  barks = 0;

  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
    this.barks = this.barks + 1;
    console.log(this.barks);
  }
  cuddle() {
    console.log(`I love you owner!`);
  }
  static info() {
    console.log('A dog is better than a cat by 10 times');
  }
  get description() {
    return `${this.name} is a ${this.breed} type of dog`;
  }
  set nicknames(value) {
    this.nick = value.trim();
  }
  get nicknames() {
    return this.nick.toUpperCase();
  }
}

const snickers = new Dog('Snickers', 'King Charles');
const sunny = new Dog('Sunny', 'Golden Doodle');
```

## String padStart and padEnd

```javascript
// Pad the start or end of a string if it's not long enough
const strings = ['short', 'medium size', 'this is really really long', 'this is really reall really really really really long'];
// Pad start based on the longest one
const longestString = strings.sort(str => str.length).map(str => str.length)[0];

strings.forEach(str => console.log(str.padStart(longestString)));
```

## ES7 exponential operator

```javascript
// 3 to the power of 3
Math.pow(3, 3);

// Same as using Math.pow()
3 ** 3
```

## Trailing comma

```javascript
const names = [
  'wes',
  'kait',
  'lux',
  'poppy', // 👈 comma dangler or trailing comma
];

const people = {
  wes: 'Cool',
  kait: 'Even Cooler!',
  lux: 'Coolest',
  poppy: 'Smallest',
  snickers: 'Bow wow', // 👈 git repo won't think it's modified
}

function family(
  mom,
  dad,
  children,
  dogs, // 👈 add these rules to your prettier, linter
) {
  // ...
}
```

## Object.entries() and Object.values()

```javascript
const inventory = {
  backpacks: 10,
  jeans: 23,
  hoodies: 4,
  shoes: 11
};

// Make a nav for the inventory
const nav = Object.keys(inventory).map(item => `<li>${item}</li>`).join('');
console.log(nav);

// Tell us how many values we have
const totalInventory = Object.values(inventory).reduce((a, b) => a + b);
console.log(totalInventory);

// Print an inventory list with numbers
Object.entries(inventory).forEach(([key, val]) => {
  console.log(key, val);
});

// With for...of we can use break and it works with any iterable
for (const [key, val] of Object.entries(inventory)) {
  console.log(key);
  if (key === 'jeans') break;
}
```
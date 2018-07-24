// named export
export const apiKey = 'abc123';

// export variable
export const url = 'http://wesbos.com';

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
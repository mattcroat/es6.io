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
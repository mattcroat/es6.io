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
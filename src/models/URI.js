const BASE_URI = "/api";
const API_VERSION = "/v1";
const URI_ENUM = ["/users", "/posts", "/login"];

const DEFAULT_URI = BASE_URI + API_VERSION;
const USERS_URI = DEFAULT_URI + URI_ENUM[0];
const POSTS_URI = DEFAULT_URI + URI_ENUM[1];
const LOGIN_URI = DEFAULT_URI + URI_ENUM[2];
export default { DEFAULT_URI, USERS_URI, POSTS_URI, LOGIN_URI };

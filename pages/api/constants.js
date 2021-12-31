
const BASE_URL = process.env.DEV_BASE_URL;

const POSTS_API_URL = BASE_URL + "/wp-json/wp/v2/posts";

const USERS_API_URL = BASE_URL + "/wp-json/wp/v2/users";

const MEDIA_API_URL = BASE_URL + "/wp-json/wp/v2/media";


export const EnvConfig = {
  BASE_URL,
  POSTS_API_URL,
  USERS_API_URL,
  MEDIA_API_URL,
};

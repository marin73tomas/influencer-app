
const BASE_URL = process.env.DEV_BASE_URL;

const POSTS_API_URL = BASE_URL + "/wp-json/wp/v2/posts";

const USERS_API_URL = BASE_URL + "/wp-json/wp/v2/users";

const MEDIA_API_URL = BASE_URL + "/wp-json/wp/v2/media";

const LOGIN_URL = BASE_URL + "/wp-json/influencer-app/login";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const EnvConfig = {
  BASE_URL,
  POSTS_API_URL,
  USERS_API_URL,
  MEDIA_API_URL,
  LOGIN_URL,
  STRIPE_SECRET_KEY,
};

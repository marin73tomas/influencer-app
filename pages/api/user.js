import { EnvConfig } from "./constants";
import axios from "axios";

export default function handler(req, res) {
  if (req.method === "GET") {
    const username = req.query.username;
    if (username) {
      axios
        .get(EnvConfig.USERS_API_URL, {
          params: {
            search: username,
          },
          auth: {
            username: process.env.WP_REST_USER,
            password: process.env.WP_REST_USER_PASSWORD,
          },
        })
        .then(({ message, data }) => {
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(400).json({ error: message });
          }
        })
        .catch(function (error) {
          res.status(500).json({ error });
        });
    }
  }
}


import { EnvConfig } from "./constants";
import axios from "axios";

export default function handler(req, res) {
  if (req.method === "POST") {
    axios
      .post(EnvConfig.USERS_API_URL, req.body, {
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
        res.status(500).json({ error, url: EnvConfig.USERS_API_URL });
      });
  }
}

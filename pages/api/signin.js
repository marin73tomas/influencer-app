import { EnvConfig } from "./constants";
import axios from "axios";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { password, username } = req.body;
    axios
      .post(EnvConfig.LOGIN_URL, {
        password,
        username,
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

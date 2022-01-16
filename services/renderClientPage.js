import axios from "axios";

export default function renderClientDataPage(session, backendUrl = "") {
  if (session && session.user) {
    return axios
      .get(`${backendUrl}/api/user`, {
        params: { username: session.user.email },
      })
      .then(({ message, data }) => {
        console.log({ data });
        if (data) {
          if (data && data.length >= 1) {
            const meta = data[0].meta;

            const { brand_name, creditCardDetails } = meta;

            if (Array.isArray(brand_name) || Array.isArray(creditCardDetails)) {
              return true;
            }
          }
        } else {
          throw new Error(message);
        }
      })
      .catch(function (error) {
        throw new Error(error);
      });
  }
}

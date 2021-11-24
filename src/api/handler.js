import axios from "axios";
export default function fetch(options) {
  return new Promise((resolve, reject) => {
    let headers = {};
    headers["Content-Type"] = "application/json";
    axios({
      url: process.env.REACT_APP_API_ROOT + options.url,
      method: options.method,
      params: options.params,
      data: options.body,
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e && e.response && e.response.data);
      });
  });
}

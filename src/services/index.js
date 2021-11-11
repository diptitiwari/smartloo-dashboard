import Axios from "axios";

export function isValidResponse(resp) {
  return resp && resp.status === 200 && resp.data.status === 1;
}

export const SmartLoo = Axios.create({
  baseURL: process.env.VUE_APP_API_LOCATION
});

export const SmartLooSite = Axios.create({
  baseURL: process.env.VUE_APP_API_LOCATION
});

SmartLoo.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token;
  return config;
});

SmartLooSite.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token_site");
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = "Bearer ".concat(token);

  return config;
});

export const methods = {
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT"
};

export class APIError {
  message;

  constructor(msg) {
    this.message = msg;
  }

  get getMessage() {
    return this.message;
  }
}

export const ServiceMaker = async (url, method, data = {}, service) => {
  try {
    let result;
    let APIInstance;

    if (service === "SmartLooSite") {
      APIInstance = SmartLooSite;
    } else {
      APIInstance = SmartLoo;
    }

    switch (method) {
      case "GET": {
        result = await APIInstance.get(url);
        break;
      }
      case "POST": {
        result = await APIInstance.post(url, data);
        break;
      }
      case "PUT": {
        result = await APIInstance.put(url, data);
        break;
      }
      case "DELETE": {
        result = await APIInstance.delete(url);
        break;
      }
      default: {
        // eslint-disable-next-line no-throw-literal
        throw "InvalidMethod";
      }
    }
    if (!isValidResponse) {
      // eslint-disable-next-line no-throw-literal
      throw "InvalidResponse";
    }
    return result.data;
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log("In service maker : ", err);
    throw new APIError(err.response ? err.response.data : "Something went wrong");
  }
};

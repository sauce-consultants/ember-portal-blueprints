import ENV from "../config/environment";

export default function getApiUrl(path = "") {
  return path.indexOf("http") === 0
    ? path
    : `${ENV.rootApiURL}/${ENV.apiNamespace}${path}`;
}

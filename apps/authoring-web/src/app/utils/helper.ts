export const hasOwnProp = (obj: object, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
export function isEmpty(obj) {
  return Object.keys(obj).length > 0;
}
export const formatPageUrl = (url) => {
  let tmp = url?.toLowerCase();
  tmp = tmp.replace(/\s/g, "");
  tmp = tmp.replace(/[^a-z0-9\- ]/gi, "");
  return tmp;
};

export const createSession = (userSession, isActive, role: string) => {
  return {
    isActive: isActive || false,
    role: role,
    permissions: userSession?.permissions,
    userInfo: userSession,
  };
};

export const getStyleString = (styles) =>
  Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join("; ");

/**
 * string to parse convert
 * @param urijson
 * @returns object
 */
export const uriToJSON = (urijson) => {
  if (urijson) {
    return JSON.parse(urijson);
  }
  return {};
};

/**
 * fallBack image
 */
export const defaultFalBackImage = () => {
  const gcpUrl = process.env.NX_GCP_URL;
  const BucketName = process.env.NX_BUCKET_NAME;
  const defaultImage = process.env.NX_DEFAULT_IMAGE;
  return `${gcpUrl}/${BucketName}/${defaultImage}`;
};

export const removeSearchLocalStorage = () => {
  localStorage.removeItem("contentType");
  localStorage.removeItem("searchKeyword");
  localStorage.removeItem("searchTags");
  localStorage.removeItem("author");
};

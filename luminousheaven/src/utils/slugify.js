// luminousheaven/src/utils/slugify.js
import Hashids from "hashids";

const hashids = new Hashids(
  "real-estate-club-properties",
  4,
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

export const encodeId = (id) => {
  return hashids.encode(id);
};

export const decodeId = (shortUid) => {
  const decoded = hashids.decode(shortUid);
  return decoded.length > 0 ? decoded[0] : null;
};

export const isValidHashId = (shortUid) => {
  const decoded = decodeId(shortUid);
  if (decoded === null) return false;
  return encodeId(decoded) === shortUid;
};

export const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const generateSmartSlug = (id, title) => {
  const baseSlug = generateSlug(title);
  const uid = encodeId(id);
  return baseSlug ? `${baseSlug}-${uid}` : String(uid);
};

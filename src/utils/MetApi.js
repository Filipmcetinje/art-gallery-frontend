const BASE_URL = import.meta.env.PROD
  ? "https://collectionapi.metmuseum.org/public/collection/v1"
  : "/met/public/collection/v1";

const searchCache = new Map();
const objectCache = new Map();

const inFlightObjects = new Map();
const inFlightSearch = new Map();

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Error: ${res.status}`));
}

export function searchObjects(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return Promise.resolve({ total: 0, objectIDs: [] });

  if (searchCache.has(q)) return Promise.resolve(searchCache.get(q));
  if (inFlightSearch.has(q)) return inFlightSearch.get(q);

  const req = fetch(
    `${BASE_URL}/search?hasImages=true&q=${encodeURIComponent(q)}`
  )
    .then(checkResponse)
    .then((data) => {
      searchCache.set(q, data);
      return data;
    })
    .finally(() => {
      inFlightSearch.delete(q);
    });

  inFlightSearch.set(q, req);
  return req;
}

export function getObjectById(objectID) {
  const id = String(objectID);

  if (objectCache.has(id)) return Promise.resolve(objectCache.get(id));
  if (inFlightObjects.has(id)) return inFlightObjects.get(id);

  const req = fetch(`${BASE_URL}/objects/${id}`)
    .then(checkResponse)
    .then((data) => {
      objectCache.set(id, data);
      return data;
    })
    .finally(() => {
      inFlightObjects.delete(id);
    });

  inFlightObjects.set(id, req);
  return req;
}

export function clearMetCache() {
  searchCache.clear();
  objectCache.clear();
  inFlightObjects.clear();
  inFlightSearch.clear();
}

const BASE_URL = "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}

function getToken() {
  return localStorage.getItem("jwt");
}

export function getSavedArtworks() {
  return fetch(`${BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
}

export function saveArtwork(artwork) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      objectID: artwork.objectID,
      title: artwork.title,
      artistDisplayName: artwork.artistDisplayName || "",
      objectDate: artwork.objectDate || "",
      primaryImageSmall: artwork.primaryImageSmall,
    }),
  }).then(checkResponse);
}

export function deleteArtwork(savedId) {
  return fetch(`${BASE_URL}/items/${savedId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
}

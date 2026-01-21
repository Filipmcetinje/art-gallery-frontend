let savedArtworks = [
  {
    _id: "fake-save-1",
    objectID: 45734,
    title: "Quail and Millet",
    artistDisplayName: "Kiyohara Yukinobu",
    primaryImageSmall:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP251139.jpg",
  },
];

export function getSavedArtworks() {
  return new Promise((resolve) => {
    resolve(savedArtworks);
  });
}

export function saveArtwork(artwork) {
  return new Promise((resolve) => {
    const savedItem = {
      ...artwork,
      _id: `fake-save-${Date.now()}`,
    };

    savedArtworks = [savedItem, ...savedArtworks];
    resolve(savedItem);
  });
}

export function deleteArtwork(savedId) {
  return new Promise((resolve) => {
    savedArtworks = savedArtworks.filter((item) => item._id !== savedId);
    resolve({ message: "deleted" });
  });
}

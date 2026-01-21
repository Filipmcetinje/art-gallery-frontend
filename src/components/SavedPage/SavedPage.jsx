import ArtworkList from "../ArtworkList/ArtworkList";

function SavedPage({ saved, onRemove, onCardClick }) {
  return (
    <section>
      <h2>Saved Artworks</h2>

      {saved.length === 0 ? (
        <p>No saved artworks yet.</p>
      ) : (
        <ArtworkList
          items={saved}
          onRemove={onRemove}
          onCardClick={onCardClick}
        />
      )}
    </section>
  );
}

export default SavedPage;

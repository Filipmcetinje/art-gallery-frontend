import "./ArtworkCard.css";

function ArtworkCard({ item, onRemove, onSave, onCardClick }) {
  const handleRemove = () => onRemove(item._id);
  const handleSave = () => onSave(item);

  return (
    <li className="artwork-card">
      <img
        className="artwork-card__image"
        src={item.primaryImageSmall}
        alt={item.title}
        onClick={() => onCardClick(item)}
      />

      <h3 className="artwork-card__title">{item.title}</h3>

      <p className="artwork-card__artist">
        {item.artistDisplayName || "Unknown artist"}
      </p>

      {onSave && item.objectID && (
        <button
          type="button"
          className="artwork-card__save"
          onClick={handleSave}
        >
          Save
        </button>
      )}

      {onRemove && item._id && (
        <button
          type="button"
          className="artwork-card__remove"
          onClick={handleRemove}
        >
          Remove
        </button>
      )}
    </li>
  );
}

export default ArtworkCard;

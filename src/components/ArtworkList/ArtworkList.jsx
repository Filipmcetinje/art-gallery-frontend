import ArtworkCard from "../ArtworkCard/ArtworkCard";
import "./ArtworkList.css";

function ArtworkList({ items, onRemove, onSave, onCardClick }) {
  return (
    <ul className="artwork-list">
      {items.map((item) => (
        <ArtworkCard
          key={item._id || item.objectID}
          item={item}
          onRemove={onRemove}
          onSave={onSave}
          onCardClick={onCardClick}
        />
      ))}
    </ul>
  );
}

export default ArtworkList;

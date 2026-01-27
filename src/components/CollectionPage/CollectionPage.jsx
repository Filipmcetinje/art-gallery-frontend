import { useEffect, useRef, useState } from "react";
import { searchObjects, getObjectById } from "../../utils/MetApi";

import Preloader from "../Preloader/Preloader";
import ArtworkList from "../ArtworkList/ArtworkList";
import NothingFound from "../NothingFound/NothingFound";

import searchIcon from "../../assets/images/search.svg";

import "./CollectionPage.css";

const INITIAL_VISIBLE = 3;
const STEP = 3;

const MAX_IDS = 20;

const BATCH_SIZE = 5;

const BATCH_DELAY_MS = 200;

function CollectionPage({ isLoggedIn, onSaveArtwork, onCardClick }) {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("painting");

  const didLoadOnce = useRef(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchObjectsInBatches = async (ids) => {
    const results = [];

    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batch = ids.slice(i, i + BATCH_SIZE);

      const settled = await Promise.allSettled(
        batch.map((id) => getObjectById(id))
      );

      const okObjects = settled
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

      results.push(...okObjects);

      await delay(BATCH_DELAY_MS);
    }

    return results;
  };

  const loadArtworks = async (q) => {
    const safeQuery = q.trim() || "painting";

    setIsLoading(true);
    setError("");
    setVisibleCount(INITIAL_VISIBLE);

    try {
      const data = await searchObjects(safeQuery);

      const ids = (data.objectIDs || []).slice(0, MAX_IDS);

      if (ids.length === 0) {
        setItems([]);
        return;
      }

      const objects = await fetchObjectsInBatches(ids);

      const withImages = objects.filter((o) => o.primaryImageSmall);

      setItems(withImages);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (didLoadOnce.current) return;
    didLoadOnce.current = true;

    loadArtworks("painting");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadArtworks(query);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + STEP);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className="collection">
      <h2 className="collection__title">Art Collection</h2>

      <form className="collection__search" onSubmit={handleSubmit}>
        <input
          className="collection__input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "landscape", "van gogh", "monet"...'
        />
        <button className="collection__search-button" type="submit">
          <img
            className="collection__search-icon"
            src={searchIcon}
            alt="Search"
          />
          Search
        </button>
      </form>

      {isLoading && <Preloader />}

      {!isLoading && error && <p className="collection__error">{error}</p>}

      {!isLoading && !error && items.length === 0 && <NothingFound />}

      {!isLoading && !error && items.length > 0 && (
        <>
          <ArtworkList
            items={visibleItems}
            onSave={isLoggedIn ? onSaveArtwork : undefined}
            onCardClick={onCardClick}
          />

          {hasMore && (
            <button
              type="button"
              className="collection__more"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default CollectionPage;

"use client";

export default function ShopFilter({
  categories = [],
  capacities = [],
  selectedCategory,
  selectedCapacity,
  onCategoryChange,
  onCapacityChange,
  onClear,
}) {
  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <header className="canvas-header">
          <div className="filter-icon">
            <span className="icon icon-filter" />
            <span>Filter</span>
          </div>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </header>

        <div className="canvas-body">
          <div className="widget-facet wd-categories">
            <div
              className="facet-title"
              data-bs-target="#categories"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="categories"
            >
              <span>Product categories</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="categories" className="collapse show">
              <ul className="tf-filter-group current-scrollbar mb_36">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="list-item d-flex gap-12 align-items-center"
                    onClick={() =>
                      onCategoryChange(selectedCategory === category ? "" : category)
                    }
                  >
                    <input
                      type="radio"
                      className="tf-check"
                      readOnly
                      checked={selectedCategory === category}
                    />
                    <label className="label">
                      <span>{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="widget-facet">
            <div
              className="facet-title"
              data-bs-target="#capacity"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="capacity"
            >
              <span>Capacity (L)</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="capacity" className="collapse show">
              <ul className="tf-filter-group current-scrollbar mb_36">
                {capacities.map((capacity) => (
                  <li
                    key={String(capacity)}
                    className="list-item d-flex gap-12 align-items-center"
                    onClick={() =>
                      onCapacityChange(
                        String(selectedCapacity) === String(capacity)
                          ? ""
                          : String(capacity)
                      )
                    }
                  >
                    <input
                      type="radio"
                      className="tf-check"
                      readOnly
                      checked={String(selectedCapacity) === String(capacity)}
                    />
                    <label className="label">
                      <span>{capacity}L</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            className="tf-btn style-2 btn-fill rounded animate-hover-btn"
            onClick={onClear}
          >
            Clear Filter
          </a>
        </div>
      </div>
    </div>
  );
}

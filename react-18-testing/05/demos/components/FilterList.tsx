import styles from './FilterList.module.css'

export default function FilterList({ items, filter, selectedItems, onFilterChange, onItemSelection }) {
    const filteredItems = items.filter(i => i.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className={styles.filterlist}>
            <p>
                <input name="Filter" type="text" value={filter} placeholder="Filter"
                    onChange={(e) => { onFilterChange(e.target.value); }}>
                </input>
            </p>
            <ul aria-label="Filtered list">
                {filteredItems.map(i =>
                    <li key={i} onClick={() => { onItemSelection(i); }}
                        className={selectedItems.includes(i) ? styles.selected : undefined}>
                        {i}
                    </li>
                )}
            </ul>
        </div>
    );
};
import {useState} from 'react';
import styles from './FilterList.module.css';

export function FilterListPure({ items, filter, selectedItems, onFilterChange, onItemSelection }) {
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

export default function FilterList({ items, onChange }) {
    const [filter, setFilter] = useState('');
    const [selectedItems, setSelectedItems] = useState([] as any[]);
    
    const itemClicked = (item) => {
        const updated = selectedItems.includes(item)
            ? selectedItems.filter(i => i != item)
            : [item, ...selectedItems];
        setSelectedItems(updated);  
        onChange(updated);
    };

    return (
        <FilterListPure 
            items={items}  
            filter={filter} 
            selectedItems={selectedItems} 
            onFilterChange={setFilter} 
            onItemSelection={itemClicked} />
    );
};
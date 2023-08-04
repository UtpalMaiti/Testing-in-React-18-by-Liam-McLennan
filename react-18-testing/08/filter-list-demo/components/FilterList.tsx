import {useEffect, useState} from 'react';
import styles from './FilterList.module.css';
import * as api from '../api';

export function FilterListPure({ items, filter, selectedItems, onFilterChange, onItemSelection }) {
    const filteredItems = items.filter(i => i.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className={styles.filterlist}>
            <p>{filteredItems.length} of {items.length}</p>
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

export default function FilterList({ onChange }) {
    const [filter, setFilter] = useState('');
    const [selectedItems, setSelectedItems] = useState([] as string[]);
    const [items, setItems] = useState([] as string[]);
    
    useEffect(() => {
        api.getPlanets().then(setItems);
    }, []);

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
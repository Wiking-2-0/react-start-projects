import React, { useEffect, useRef, useState } from 'react';
import Collection from '../../components/photos/collection';
import './photos.scss';

const categories = [
    {name: 'All', id: 0},
    {name: 'Group 1', id: 2},
    {name: 'Group 2', id: 3},
    {name: 'Group 3', id: 5}
]

function Photos() {
    const [isLoading, setLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const pageLimit = 3;
    const pages = useRef(1)
    const activePage = useRef(1)
    const [searchValue, setSearchValue] = useState('')
    const defaultCollections = useRef([])
    const collection = useRef([])
    const [filteredCollections, setFilteredCollections] = useState([])

    useEffect(() => {
        setLoading(true);

        fetch(`https://picsum.photos/v2/list?page=1&limit=20`)
            .then(res => res.json())
            .then(json => {
                defaultCollections.current = sortItemsByCategory(json);
                collection.current = [...defaultCollections.current[0]];
                const count = Math.ceil(json.length / pageLimit);
                pages.current = count;
                cropCollection();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });

            const sortItemsByCategory = (items, categoryIndex = categories.length - 1, sortedItems = {}) => {
                if (categoryIndex === 0) {
                    return sortedItems;
                }

                const sortCategoryId = categories[categoryIndex].id;
                sortedItems[sortCategoryId] = [];

                if (categories.length - 1 === categoryIndex) {
                    sortedItems[0] = [...items];
                }

                const newItems = items.filter(item => {
                    if (item.id !== '0' && item.id % sortCategoryId === 0) {
                        sortedItems[sortCategoryId].push(item);
                        return false;
                    }

                    return true;
                })

                return sortItemsByCategory(newItems, --categoryIndex, sortedItems);
            }
    }, [])


    const switchCollection = (categoryId) => {
        activePage.current = 1;
        collection.current = [...defaultCollections.current[categoryId]]
        pages.current = Math.ceil(collection.current.length / pageLimit);

        cropCollection();
        setCategoryId(categoryId);
    }

    const cropCollection = () => {
        const startIndex = (activePage.current - 1) * pageLimit;
        const collectionsPart = [...collection.current].splice(startIndex, pageLimit);

        setFilteredCollections(collectionsPart);
    }

    const onPaginationClick = (index) => {
        activePage.current = index;
        cropCollection();
    }

    return (
        <div className="photos-wrapper">
            <div className="photos">
                <h1>My photos collection</h1>
                <div className="top">
                    <ul className="tags">
                        {
                            categories.map(cat => (
                                <li
                                    className={`${categoryId === cat.id ? 'active' : ''}`}
                                    key={cat.id}
                                    onClick={switchCollection.bind(null, cat.id)}
                                >
                                    {cat.name}
                                </li>
                            ))
                        }
                    </ul>
                    <input
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        className="search-input"
                        placeholder="Search by name"
                    />
                </div>
                <div className="content">
                    {isLoading
                        ? <h2>Loading....</h2>
                        : filteredCollections
                        .filter(item => item.author.toLowerCase().includes(searchValue))
                        .map((item, index) => (
                            <Collection
                                key={index}
                                name={item.author}
                                image={item.download_url}
                            />
                        ))
                    }
                </div>
                <ul className="pagination">
                    {
                        new Array(pages.current).fill('').map((item, i) => (
                            <li
                                key={i}
                                className={`${activePage.current === i + 1 ? 'active' : ''}`}
                                onClick={onPaginationClick.bind(this, i + 1)}
                            >{i + 1}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Photos;

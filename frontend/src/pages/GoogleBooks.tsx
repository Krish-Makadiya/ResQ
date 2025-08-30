import React, { useState } from 'react';
import axios from 'axios';

interface BookInfo {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: { thumbnail: string };
        previewLink?: string;
    };
}

const GoogleBooksSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<BookInfo[]>([]);

    const handleSearch = async () => {
        const res = await axios.get(`http://localhost:4000/api/books/search?q=${query}`);
        setBooks(res.data.items || []);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Google Books Search</h2>
            <input
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div style={{ marginTop: '20px' }}>
                {books.map((book) => {
                    const info = book.volumeInfo;
                    return (
                        <div key={book.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                            <h3>{info.title}</h3>
                            <p>{info.authors?.join(', ') || 'Unknown author'}</p>
                            {info.imageLinks && <img src={info.imageLinks.thumbnail} alt={info.title} />}
                            <p>{info.description?.substring(0, 120) || 'No description'}</p>
                            <a href={info.previewLink} target="_blank" rel="noreferrer">Preview</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GoogleBooksSearch;

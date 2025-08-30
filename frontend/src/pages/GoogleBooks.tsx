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
        <div className="p-6 bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-violet-900/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-violet-300">Google Books Search</h2>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-violet-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                    onClick={handleSearch}
                    className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-800 transition-colors shadow-md"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => {
                    const info = book.volumeInfo;
                    return (
                        <div 
                            key={book.id} 
                            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-violet-900/20 transition-shadow duration-300 border border-gray-200 dark:border-violet-900/50"
                        >
                            {info.imageLinks && (
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={info.imageLinks.thumbnail.replace('http://', 'https://')} 
                                        alt={info.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-violet-200 line-clamp-2">
                                    {info.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-violet-300 mb-3">
                                    {info.authors?.join(', ') || 'Unknown author'}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-violet-100 mb-4 line-clamp-3">
                                    {info.description || 'No description available'}
                                </p>
                                {info.previewLink && (
                                    <a 
                                        href={info.previewLink} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-800 rounded-lg transition-colors"
                                    >
                                        Preview Book
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GoogleBooksSearch;

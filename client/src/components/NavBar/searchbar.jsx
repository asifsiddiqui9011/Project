import './searchbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (term === '') {
            return;
        }
        // Pass the query in the URL
        navigate(`/search-results?query=${encodeURIComponent(term)}`);
    };

    return (
        <form onSubmit={handleSubmit} className='searchbar'>
            <input
                className='searchinput'
                id='searchid'
                type="text"
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button type="submit" id='searchicon' style={{ fontSize: '1.8rem' }}>
                <i className="pi pi-search"></i>
            </button> */}
            <i type="submit" className="pi pi-search" id='searchicon' ></i>
        </form>
    );
}

export default SearchBar;

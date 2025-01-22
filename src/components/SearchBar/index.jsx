import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../Button';
import PropTypes from 'prop-types';
import style from './SearchBar.module.css'

export default function SearchBar({placeholder, setSearchParams}) {
    const [input, setInput] = useState("");

    const handleSearch = (q) => {
        if (input.trim() != "") {
            setSearchParams({q});
            setInput("");
        }
    }

    return (
        <div className={style.searchBar}>
            <label className = {style.bar}>
                <Search />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => {setInput(e.target.value)}}
                    onKeyDown={(e) => {if(e.key === "Enter") handleSearch(input)}}
                />
            </label>
            <Button onClick={() => handleSearch(input)}>
                Pesquisar
            </Button>
        </div>
    );
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    setSearchParams: PropTypes.func,
};
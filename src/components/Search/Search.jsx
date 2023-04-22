import { useEffect, useRef, useState } from 'react';
import { TextInput, Button, MenuList, MenuListItem } from 'react95';
import allLinks from './allLinks';
import { googleIcon } from '../../assets/icons';

const Search = () => {
  const searchInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredLinks, setFilteredLinks] = useState(allLinks);

  const focusSearch = (event) => {
    if (event.keyCode === 32) {
      searchInput.current.focus();
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", focusSearch);

    return ()=>{
      window.removeEventListener("keyup", focusSearch);
    }
  }, []);

  useEffect(() => {
    if (query) {
      setOpen(true);
      setFilteredLinks(
        allLinks
          .filter((link) => (
            link.label.toLowerCase().includes(query.toLowerCase())
          ))
      )
    } else {
      setOpen(false);
      setFilteredLinks(allLinks);
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.location.href = googleSearch;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {open && filteredLinks.length > 0 && (
        <MenuList
          style={{
            position: 'absolute',
            left: '0',
            bottom: '100%'
          }}
          onClick={() => setOpen(false)}
        >
          {
            filteredLinks
              .map((link) => (
                <MenuListItem key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={link.icon}
                      alt={link.alt}
                      style={{ width: '20px' }}
                    />
                    <div>{link.label}</div>
                  </a>
                </MenuListItem>
              ))
          }
        </MenuList>
      )}
      <span style={{ display: 'flex', gap: '5px' }}>
        <TextInput
          ref={searchInput}
          placeholder='Search...'
          width={150}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button onClick={handleSearch}>
          <img
            src={googleIcon}
            alt='google'
            style={{ width: '20px' }}
          />
        </Button>
      </span>
    </div>
  )
}

export default Search;
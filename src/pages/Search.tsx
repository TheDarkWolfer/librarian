// Morceaux de React qu'on va utiliser
import {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

// Morceaux de Material UI pour faire joli
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

//Appel à l'API pour récupérer les infos
import { useSimpleSearch } from '../api_logic/Requests.tsx';

function App() {

  const [bookName, setBookName] = useState<string>("Ellana");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const location = useLocation();
  const [triggerSearch, setTriggerSearch] = useState(false);
  const { data, loading, error } = useSimpleSearch(searchTerm);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setBookName(query);
      setSearchTerm(query)
    }
  }, [location.search]);
    
  useEffect(() => {
    if (data || error) setTriggerSearch(false);
  }, [data, error]);

  const handleSearch = () => {
    setSearchTerm(bookName);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value);
  };
  return (
    <>
    <h1>𝓡𝓮𝓬𝓱𝓮𝓻𝓬𝓱𝓮</h1>
      <TextField 
	label="Livre" 
	variant="outlined"
        value={bookName}
        onChange={handleChange}
      /> 
      <Button
	variant="contained"
	onClick={handleSearch}
	sx={{ mt: 1 }}
      >
	<SearchIcon/>
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
	<div>
	  <h3>{data.numFound} résultats pour "{searchTerm}"</h3>
	  <div style={{
	    display: 'grid',
	    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
	    gap: '20px',
	    marginTop: '20px'
	  }}>
	    {data.docs.map((book) => (
	      <div key={book.key} style={{
		border: '1px solid #ddd',
		padding: '15px',
		borderRadius: '5px'
	      }}>

		<h4>{book.title}</h4>
		<div key={book.key} className="book">
		  <Link to={`/book/?id=${book.key.split('/').pop()}`}>
		    //<h3>{book.title}</h3>
		    
		  </Link>
		</div>
			  {book.cover_i && (
			    <img
			      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}	
			      alt={`Cover of ${book.title}`}
			      style={{
				width: '100%',
				height: 'auto',
				marginBottom: '10px',
				maxHeight: '300px',
				objectFit: 'contain'
			      }}
            />
          )}
		{book.author_name && (
		  <p><small>par {book.author_name.join(', ')}</small></p>
		)}
		{book.first_publish_year && (
		  <p><small>Première édition: {book.first_publish_year}</small></p>
		)}
		{book.ebook_access === 'public' && (
		  <p><small>Disponible en ligne</small></p>
		)}
	      </div>
	    ))}
	  </div>
	</div>
      )}
    </>
  )
}

export default App;

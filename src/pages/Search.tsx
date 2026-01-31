// Morceaux de React qu'on va utiliser
import {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

// Morceaux de Material UI pour faire joli
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//Appel à l'API pour récupérer les infos
import { useSimpleSearch } from '../api_logic/Requests.tsx';

// Structure des cartes de chaque livre
import { BookCard } from '../components/BookCard.tsx'

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
    <Typography variant="h1">
      Recherche
    </Typography>
    <Box sx={{
    }}>
      <TextField 
	sx={{
	  height:"0rem"
	}}
	label="Livre" 
	variant="outlined"
        value={bookName}
        onChange={handleChange}
      /> 
      <Button
	variant="contained"
	onClick={handleSearch}
	sx={{ 
	  mt: 1,
	  width:"3rem",
	  height:"3rem", // J'ai passé un quart d'heure là dessus, à avoir des erreurs sur le mimetype. Merci au revoir (つ╥﹏╥)つ
	}}
      >
	<SearchIcon/>
      </Button>
    </Box>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && <BookCard bookData={data} searchTerm={searchTerm} />}
    </>
  )
}

export default App;

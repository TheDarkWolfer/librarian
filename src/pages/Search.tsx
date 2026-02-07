// Morceaux de React qu'on va utiliser
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

// Morceaux de Material UI pour faire joli
import SearchIcon from '@mui/icons-material/Search';

import {
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';

import NumberField from '../components/NumberField.tsx';

//Appel à l'API pour récupérer les infos
import { useSimpleSearch } from '../api_logic/Requests.tsx';

// Structure des cartes de chaque livre
import { BookCard } from '../components/BookCard.tsx'

function App() {
  const location = useLocation();

  // Get initial values from URL
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get('q') || "";

  // Initialize state with URL values
  const [bookName, setBookName] = useState<string>(urlQuery);
  const [searchTerm, setSearchTerm] = useState<string>(urlQuery);

  // Pour le slider de choix de période
  const Year:number = new Date().getFullYear();
  /* const [timeFrame, setTimeFrame] = useState<number[]>([1800,Year]); */
 const [timeFrame, setTimeFrame] = useState<number[]>(() => {
  const startYear = searchParams.get('startYear') || "1800";
  const endYear = searchParams.get('endYear') || Year.toString();
  return [Number(startYear), Number(endYear)];
});

  const { data, loading, error } = useSimpleSearch(searchTerm,timeFrame);
    
  useEffect(() => {
    if (data || error);
  }, [data, error]);

  const handleSearch = () => {
    setSearchTerm(bookName);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value);
  };

  console.log('timeFrame:',timeFrame,'searchTerm:',searchTerm)

  return (
    <>
    <Box
      sx={{
	    width:"100%",
	    maxWidth:"100%",
	    overflow:"hidden",
	  }}>
      <Typography variant="h3">
	Recherche
      </Typography>
      <Box sx={{
      }}>
	<TextField 
	  sx={{
	    height:"0rem"
	  }}
	  label="Titre, Auteur.ice, Tags..." 
	  variant="outlined"
	  value={bookName}
	  onChange={handleChange}
	/>
	<NumberField
	  min={1800}
	  max={Year}
	  size="small"
	  value={timeFrame[0]}
	  onValueChange={(value) => setTimeFrame(prev => [value ?? prev[0], prev[1]])}
	  helperLabel="publication minimale"
	  label="publication minimale"
	/>
	<NumberField
	  min={1800}
	  max={Year}
	  size="small"
	  value={timeFrame[1]}
	  onValueChange={(value) => setTimeFrame(prev => [prev[0], value ?? prev[1]])}
	  helperLabel="publication maximale"
	  label="publication maximale"
	/>
	<Button
	  variant="contained"
	  aria-label="search"
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
	</Box>
    </>
  )
}

export default App;

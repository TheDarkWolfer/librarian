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

  // Récupérations des paramètres d'URL'
  const [bookName, setBookName] = useState<string>(urlQuery);
  const [searchTerm, setSearchTerm] = useState<string>(urlQuery);

  // Pour le champ de choix de période
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
    <Box sx={{
      width: "100%",
      maxWidth: "1200px", // Largeur maximale pour éviter les lignes trop longues
      margin: "0 auto", // Centre horizontalement
      padding: 2, // Espacement interne
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centre tous les enfants horizontalement
      gap: 3, // Espacement entre les sections
    }}>
      {/* Titre centré */}
      <Typography
	variant="h3"
	sx={{
	  textAlign: 'center',
	  width: '100%',
	  mb: 2
	}}
      >
	Recherche
      </Typography>

      {/* Conteneur du formulaire */}
      <Box sx={{
	width: '100%',
	display: 'flex',
	flexDirection: { xs: 'column', sm: 'row' },
	justifyContent: 'center', // Centre horizontalement
	alignItems: 'center', // Centre verticalement
	gap: 2,
	flexWrap: 'wrap',
      }}>
	{/* Champ de recherche */}
	<TextField
	  fullWidth
	  label="Titre, Auteur.ice, Tags..."
	  variant="outlined"
	  value={bookName}
	  onChange={handleChange}
	  sx={{
	    maxWidth: '500px', // Largeur maximale pour le champ
	    flex: 1,
	    minWidth: '250px',
	  }}
	/>

	{/* Conteneur des champs de date et bouton */}
	<Box sx={{
	  display: 'flex',
	  justifyContent: 'center',
	  alignItems: 'center',
	  gap: 2,
	  flexWrap: 'wrap',
	}}>
	  <NumberField
	    min={1800}
	    max={Year}
	    size="small"
	    value={timeFrame[0]}
	    onValueChange={(value) => setTimeFrame(prev => [value ?? prev[0], prev[1]])}
	    helperLabel="minimale"
	    label="minimale"
	    sx={{
	      width: '120px',
	      textAlign: 'center'
	    }}
	  />
	  <NumberField
	    min={1800}
	    max={Year}
	    size="small"
	    value={timeFrame[1]}
	    onValueChange={(value) => setTimeFrame(prev => [prev[0], value ?? prev[1]])}
	    helperLabel="maximale"
	    label="maximale"
	    sx={{
	      width: '120px',
	      textAlign: 'center'
	    }}
	  />
	  <Button
	    variant="contained"
	    aria-label="search"
	    onClick={handleSearch}
	    sx={{
	      width: "48px",
	      height: "48px",
	      minWidth: "48px",
	    }}
	  >
	    <SearchIcon/>
	  </Button>
	</Box>
      </Box>

      {/* Messages de statut et résultats */}
      <Box sx={{
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center', // Centre tous les messages
	gap: 2,
	mt: 2,
      }}>
	{loading && <Typography sx={{ textAlign: 'center' }}>Chargement en cours...</Typography>}
	{error && <Typography color="error" sx={{ textAlign: 'center' }}>Erreur : {error}</Typography>}
	{data && <BookCard bookData={data} searchTerm={searchTerm} />}
      </Box>
    </Box>
  )
}

export default App;

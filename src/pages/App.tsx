// Import des éléments nécessaires depuis React
import { useState, useContext, createContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Import de différents éléments depuis MaterialUI pour
// améliorer l'apparence du site
import Checkbox from '@mui/material/Checkbox';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import BiotechIcon from '@mui/icons-material/Biotech';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

//Éléments fonctionnels de MaterialUI
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import ToolBar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// Éléments plus visuels que fonctionnels
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Différentes routes
import SearchPage from './Search.tsx'; // Recherche avancée
import BookPage from './Book.tsx'; // Détails d'un livre précis

//========================[Beauté de l'interface]========================//

// Import d'une feuille de style parce que je REFUSE de
// négliger cet aspect
import '../style.css';

// Implémentation de modes sombre / clair
import { lightTheme, darkTheme } from './theme.ts'
export const ThemeContext = createContext<string>(null);

// Usage d'un hook custom pour simplifier les choses
// export function useTheme() {
//   return useContext(ThemeContext);
// }

function App() {

  const [ theme, setTheme ] = useState<string>('dark'); // Sombre par défaut, on évite les flashbangs à 3h du mat'

  
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newPage: string) => {
  switch (newPage) {
    case "theme":
      return;
    case "back":
      navigate(-1);
    default:
      navigate(newPage);
    } 
  }

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };


  return (
  <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
    <CssBaseline/>
      <div style={{
	  display: 'flex',
	  flexDirection: 'column',
	  minHeight: '100vh'
	}}>
      <>
       <Box sx={{ 
	 flex: 1, 
	 paddingTop: "5rem",
	 paddingBottom: "5rem",
       }}>
	 <Routes>
	    <Route path="/search" element={<SearchPage/>} />
	    <Route path="/book" element={<BookPage/>} />
	  </Routes>
      </Box>

      <AppBar 
	position="fixed"
	sx={{
	  opacity:1,
	  boxShadow:'none',
	  backgroundImage: 'none', 
	  backgroundColor: `${theme === 'dark' ? '#393552' : '#f2e9e1'}`,
	  color:`${theme === 'dark' ? '#393552' : '#f2e9e1'}`,
	}}
      >
	<ToolBar>
	  <Box>
	    <TextField 
	      variant="outlined" 
	      label="Recherche rapide" 
	      placeholder="Recherche rapide..."
		
	      // Permettre la recherche depuis la barre de navigation
	      value={query}
	      onChange={(e) => setQuery(e.target.value)}
	      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
	    />
	  </Box>
	  <Button
	    variant="contained"
	    onClick={handleSearch}
	    sx={{ 
	      ml: 1, 
	      height: '40px' 
	    }}
	  >
	    Rechercher
	  </Button>
	  <Typography
	    variant="h6"
	    sx={{
	      padding:"1rem",
	      margin:"0rem",
	    }}
	  >
	  </Typography>
	</ToolBar>
      </AppBar>

      </>
      <BottomNavigation 
	  value={location.pathname} 
	  onChange={handleChange}
	  sx={{ 
	    bottom: 0, 
	    width: '100%',
	    position: 'fixed',
	    backgroundColor: `${theme === 'dark' ? '#393552' : '#f2e9e1'}`,
	    color:`${theme === 'dark' ? '#393552' : '#f2e9e1'}`,
	  }}  
	  >
	  
	  // Bouton pour changer le thème ; me sers bien des ternaires vu que ça 
	  // rend la gestion du changement d'état BIEN PRATIQUE~
	  <BottomNavigationAction
	    label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
	    icon={
	      theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />
	    }
	    onClick={(e) => {
	      setTheme(theme === 'dark' ? 'light' : 'dark')
	      e.preventDefault()
	    }}
	    value="theme"
	  />
	  <BottomNavigationAction
	    label="Accueil"
	    value="back" // C'est fait à la McGuyver ? Oui. Pas touche (¬_¬")
	    icon={<HomeFilledIcon/>}
	    />
	  <BottomNavigationAction
	    label="Recherche"
	    value="search" // J'ai dit pas touche (¬_¬")
	    icon={<SearchIcon />}
	    />
	</BottomNavigation>
    </div>
  </ThemeProvider>
)}

export default App;

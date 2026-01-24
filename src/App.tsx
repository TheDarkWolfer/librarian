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

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

// Différentes routes
import Search from './Search.tsx'; // Recherche avancée

//========================[Beauté de l'interface]========================//

// Import d'une feuille de style parce que je REFUSE de
// négliger cet aspect
import './style.css';

// Implémentation de modes sombre / clair
import { lightTheme, darkTheme } from './theme.ts'
export const ThemeContext = createContext<string>(null);

// Usage d'un hook custom pour simplifier les choses
export function useTheme() {
  return useContext(ThemeContext);
}

function App() {

  const [ theme, setTheme ] = useState<string>('dark'); // Sombre par défaut, on évite les flashbangs à 3h du mat'

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (event: React.SyntheticEvent, newPage: string) => {
    if (newPage != "theme") {
      navigate(newPage)
    }
  }

  return (
  <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
    <CssBaseline/>
      <div style={{
	  display: 'flex',
	  flexDirection: 'column',
	  minHeight: '100vh'
	}}>
      <>
      <div style={{flex:1}}>
	<Routes>
	  <Route path="/search" element={<Search />} />
	</Routes>
      </div>
      </>
      <BottomNavigation 
	  value={location.pathname} 
	  onChange={handleChange}
	  position="relative"
	  sx={{ bottom: 0, width: '100%' }}  
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
	    // Optional: Prevent navigation when clicking the theme toggle
	    //onChange={(e) => e.stopPropagation()}
	  />
	  <BottomNavigationAction
	    label="Accueil"
	    value=""
	    icon={<HomeFilledIcon/>}
	    />
	  <BottomNavigationAction
	    label="Recherche"
	    value="search"
	    icon={<SearchIcon />}
	    />
	</BottomNavigation>
    </div>
  </ThemeProvider>
)}

export default App;

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

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

// Différentes routes
import Search from './Search.tsx';

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
    navigate(newPage)
  }

  return (
  <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
    <CssBaseline/>
      <>
	<nav className="pages">
	  <ul>

	    <Checkbox
	      icon={<DarkModeIcon/>}
	      checkedIcon={<LightModeIcon/>}
	      // Ternaire pour la sélection du thème
	      onChange={(e) => {
		setTheme(e.target.checked ? 'light' : 'dark')
	      }}
	      />
	    <li><a href="/">Home</a></li>
	    <li><a href="/search">Search</a></li>
	  </ul>

	  <BottomNavigation value={location.pathname} onChange={handleChange}>
	    <BottomNavigationAction
	      label="Accueil"
	      value="home"
	      icon={<HomeFilledIcon/>}
	      />
	    <BottomNavigationAction
	      label="Recherche"
	      value="search"
	      icon={<SearchIcon />}
	      />
	    <BottomNavigationAction
	      label="Recherche avancée"
	      value="adv_search"
	      icon={<BiotechIcon/>}
	      />
	  </BottomNavigation>
	</nav>

	<Routes>
	  <Route path="/search" element={<Search />} />
	</Routes>
      </>
  </ThemeProvider>
)}

export default App;

// Séparation du contexte du thème, par mesure de clarté du code
import { createContext } from 'react';
export const ThemeContext = createContext<string>(null);

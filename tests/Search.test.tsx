import { render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from '../src/pages/App.tsx';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers); 

test("Affichage de la page de recherche", async () => {
  render(
    <MemoryRouter initialEntries={['/search']}>
      <App/>
    </MemoryRouter>
  );

  // On vérifie que la barre de navigations est bien présente
  await screen.findByRole('navigation');

  // Vérification du titre (regex indifférent à la case)
  expect(screen.getByRole('heading', { name: /recherche/i })).toBeInTheDocument();

  // Vérifcation de la présence d'une section de recherche pour les livres
  expect(screen.getByLabelText(/titre/i)).toBeInTheDocument();

  // Vérification des NumberFields, en utilisants leurs labels
  expect(screen.getByLabelText(/début/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/fin/i)).toBeInTheDocument();

  // On s'assure que le bouton de recherche est bien présent
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
}) 

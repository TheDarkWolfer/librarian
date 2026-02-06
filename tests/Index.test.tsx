import { render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from '../src/pages/App.tsx';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Pour simuler les requêtes à l'API distante
import axios from 'axios';
vitest.mock('axios');

test("Affichage de la page d'accueil, avec les éléments de navigation", async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // On attend la fin des opérations aynschrones
  await screen.findByRole('navigation');

  // Et ensuite on fait les tests
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getAllByText(/Accueil/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/Recherche rapide/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/Light Mode/i)[0]).toBeInTheDocument();
});



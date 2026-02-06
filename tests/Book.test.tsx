import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import App from "../src/pages/App.tsx";
import "@testing-library/jest-dom";
import { vi, test, expect, beforeEach } from "vitest";

vi.mock("axios");
const mockedGet = vi.mocked(axios.get);

beforeEach(() => {
  vi.resetAllMocks();

  // Modification nécessaire ; l'endpoint `book` a besoin d'insérer ça dans l'URL
  window.history.pushState({}, "Test", "/book/?id=OL27448W");
});

test("Affichage des informations d'un livre et de ses auteur.ices", async () => {
  // Livre factice pour les tests
  const mockWork = {
    title: "Bouquin testificate",
    description: "Faites genre qu'il y a une description palpitante ici",
    covers: [123456],
    authors: [{ author: { key: "/authors/OL123A" } }],
  };

  // Fausses données d'<AuthorDetails>
  const mockAuthor = {
    name: "George Andwell",
    bio: "Il est né avant d'être mort, comme beaucoup d'autres avant lui",
    photos: [],
  };

  mockedGet.mockImplementation((url: any) => {
    const u = String(url);

    // Données de l'URL. Pourquoi je me suis infligé ça...
    if (u.includes("OL27448W") && u.includes("works") && u.endsWith(".json")) {
      return Promise.resolve({ data: mockWork } as any);
    }

    // Fetch des données de l'auteur.ice
    if (u.includes("OL123A") && u.includes("authors") && u.endsWith(".json")) {
      return Promise.resolve({ data: mockAuthor } as any);
    }

    // On croise les doigts, mais normalement pas d'erreurs
    return Promise.reject(new Error(`Unhandled axios.get URL: ${u}`));
  });

  render(
    <MemoryRouter initialEntries={["/book/?id=OL27448W"]}>
      <App />
    </MemoryRouter>
  );

  // On attend que le titre s'affiche bien'
  expect(
    await screen.findByRole("heading", { name: /bouquin testificate/i })
  ).toBeInTheDocument();

  // Author name is rendered as <h3> in AuthorDetails (role="heading")
  expect(
    await screen.findByRole("heading", { name: /george andwell/i })
  ).toBeInTheDocument();

  // Optional: description
  expect(
    await screen.findByText(/faites genre qu'il y a une description palpitante ici/i)
  ).toBeInTheDocument();
});


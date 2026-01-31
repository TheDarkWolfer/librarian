import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { z } from 'zod';

// Interfaces pour pouvoir stocker les données de l'API
export interface BookDoc {
  key: string;
  title: string;
  ebook_access: string;
  edition_count: number;
  has_fulltext: boolean;
  public_scan_b: boolean;

  author_key?: string[];
  author_name?: string[];
  cover_edition_key?: string;
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
  ia?: string[];
  ia_collection?: string[];
  lending_edition_s?: string;
  lending_identifier_s?: string;
}

interface SearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: null | number;
  docs: BookDoc[];
}

interface AuthorData {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { type: string; value: string };
  wikipedia?: string;
  photos?: number[];
  links?: { url: string; title: string; type: { key: string } }[];
  remote_ids?: {
    viaf?: string;
    wikidata?: string;
    isni?: string;
    goodreads?: string;
  };
  alternate_names?: string[];
  personal_name?: string;
  source_records?: string[];
  // Bon, vu qu'on va afficher un paquet de data, autant avoir
  // une structure stable et viable pour ça
}


// Fonction de nettoyage de l'entrée utilisateur.ice avec zod, au cas où
function sanitizeInput(dataIn: string): string {
  const dataValidationSchema = z.string()
    .trim()
    .min(1, "Query can't be empty")
    .max(200, "Invalid query size")
    .regex(/^[a-zA-Z0-9\s\-']+$/, "Invalid characters in query");

  const validatedQuery = dataValidationSchema.parse(dataIn);   
  const safeQuery = encodeURIComponent(validatedQuery);

  return safeQuery;
}

// Hook permettant de faire les requêtes ; prend en entrée un terme 
// (livre, nom d'auteur, bref quoi que çe soit), et et renvoie données, 
// status et erreur (si applicable)
export function useSimpleSearch(userQuery: string) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const safeQuery = sanitizeInput(userQuery);
        const response = await axios.get<SearchResponse>(
          `https://openlibrary.org/search.json?q=${safeQuery}`
        );
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'You broke it (•̀⤙•́)');
      } finally {
        setLoading(false);
      }
    };

    if (userQuery) {
      fetchData();
    }
  }, [userQuery]);

  return { data, loading, error };
}

// Oui on recycle le hook, mais ça permet une meilleure rigueur dans le traitement
// des données, et d'utiliser une fonction plus précise pour les recherches précises
export function useSpecificSearch(userQuery: string) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const safeQuery = sanitizeInput(userQuery);
        const response = await axios.get<SearchResponse>(
          `https://openlibrary.org/works/${safeQuery}.json`
        );
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Aucune oeuvre trouvée (つ╥﹏╥)つ');
      } finally {
        setLoading(false);
      }
    };

    if (userQuery) {
      fetchData();
    }
  }, [userQuery]);

  return { data, loading, error };
}

// Fonction pour récupérer le nom d'un.e auteur.ice, une troisième itération des fonctions précédentes
export function useAuthorSearch(authorKey: string) {
  const [data, setData] = useState<AuthorData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const authorId = authorKey.replace('/authors/', '');
        const response = await axios.get<AuthorData>(
          `https://openlibrary.org/authors/${authorId}.json`
        );
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Il manque un gens dans la DB (¬_¬")');
      } finally {
        setLoading(false);
      }
    };

    if (authorKey) {
      fetchData();
    }
  }, [authorKey]);

  return { data, loading, error };
}


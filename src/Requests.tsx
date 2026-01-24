import {useEffect, useState} from 'react';
import { axios } from 'axios';

/* 
  Interfaces (schémas) pour les données récupérées par le call API ; 
  J'ai fait ça par soucis de clareté et de documentation.
*/
interface BookDoc {
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

async function simplesearch(userquery: string): Promise<SearchResponse> {
    /*
      dev note : je sais que passer ce que l'utilisateur.ice directement 
      à l'api est une idée aussi viable que de se parfumer au bacon avant 
      d'aller dans la savane ; cependant, étant dans un environnement de 
      dev où les seules personnes qui pourraient en abuser savent pertinament 
      que je vais les perdre dans la forêt si iels osent, je me permets de 
      faire un truc instable avant de l'améliorer et de le sécuriser pour 
      que ça marche avant de marcher bien.
      risk management baby ˶ˆᗜˆ˵ !
    */
  const response = await axios.get<SearchResponse>(
    `https://openlibrary.org/search.json?q=${userquery}`
  );
  
  return response.data;
}


// On récupère les parties de React qui pourraient nous servir
import {useState, useEffect} from 'react';

// Material UI pour que ça soit agréable sur les yeux
import { 
  Box,
} from '@mui/material';

// On récupère aussi la fonction de recherche depuis 
// le fichier de logique des requêtes
import { useSpecificSearch } from '../api_logic/Requests.tsx';
import { AuthorDetails } from '../components/AuthorCard.tsx';

function App() {
  // useState pour l'ID du bouquin
  const [bookID, setBookID] = useState<string>("");
  
  const {data, loading, error} = useSpecificSearch(bookID);

  // Vu qu'on a potentiellement plusieurs auteur.ices, il faut adapter l'affichage des noms

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // Récupération de l'ID dans l'URL
    if (id) {
      setBookID(id); // On stocke l'ID du livre, encore une fois
    }
  }, [])

  // console.log(data) 
  /*
    Je laisse ça pour deux raisons :
      1. Ça peut toujours servir
      2. J'ai passé dix minutes à chercher ce maudit console.log, et je veux garder ça là comme un petit souvenir de cette interruption
  */

  return (
      <>
	<h1>Détails d'un livre</h1>
	{loading && <p>Loading...</p>}
	{error && <p>Error: {error.message}</p>}
	  {data && (
	    <Box>
	      <h2>{data.title}</h2>
	      
	      {data.authors?.map((authorObj, index) => (
		<AuthorDetails key={index} authorKey={authorObj.author.key} />
	      ))}
	    </Box>
	  )}
      </>
  )
}

export default App;

// On récupère les parties de React qui pourraient nous servir
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

// Material UI pour que ça soit agréable sur les yeux
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// On récupère aussi la fonction de recherche depuis 
// le fichier de logique des requêtes
import { useSpecificSearch, useAuthorSearch  } from '../api_logic/Requests.tsx';
import { AuthorDetails } from '../components/AuthorCard.tsx';

function App() {
  // useState pour l'ID du bouquin
  const [bookID, setBookID] = useState<string>("");
  
  // Récupération de l'ID depuis l'URL
  const { key } = useParams();
  const {data, loading, error} = useSpecificSearch(bookID);

  // Vu qu'on a potentiellement plusieurs auteur.ices, il faut adapter l'affichage des noms

  function AuthorName({ authorKey }: { authorKey: string }) {
    const { data, loading, error } = useAuthorSearch(authorKey);
    
    if (loading) return <span>...</span>;
    return <span>{data?.name || "Unknown"}</span>;
  }


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // Récupération de l'ID dans l'URL
    if (id) {
      setBookID(id); // On stocke l'ID du livre, encore une fois
    }
  }, [location.search])

  console.log(data)

  return (
      <>
	<h1>𝓓é𝓽𝓪𝓲𝓵𝓼 𝓭'𝓾𝓷 𝓵𝓲𝓿𝓻𝓮</h1>
	{loading && <p>Loading...</p>}
	{error && <p>Error: {error.message}</p>}
	  {data && (
	    <Box>
	      <h2>{data.title}</h2>
	      
	      <Typography variant="h6">Author(s):</Typography>
	      {data.authors?.map((authorObj, index) => (
		<AuthorDetails key={index} authorKey={authorObj.author.key} />
	      ))}
	    </Box>
	  )}
      </>
  )
}

export default App;

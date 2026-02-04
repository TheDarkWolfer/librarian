// On récupère les parties de React qui pourraient nous servir
import { useState, useEffect } from 'react';

// Material UI pour que ça soit agréable sur les yeux
import { 
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from '@mui/material';

// On récupère aussi la fonction de recherche depuis 
// le fichier de logique des requêtes
import { useSpecificSearch } from '../api_logic/Requests.tsx';
import { AuthorDetails } from '../components/AuthorCard.tsx';

// Le thème : le plus important ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧
import { useTheme } from '@mui/material/styles';

function App() {
  // useState pour l'ID du bouquin
  const [bookID, setBookID] = useState<string>("");
  
  const { data, loading, error } = useSpecificSearch(bookID);

  const theme = useTheme();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setBookID(id);
    }
  }, []);

  // Construire l'URL de la couverture
  // Open Library utilise les cover IDs ou l'OLID du livre
  const getCoverUrl = () => {
    // Check if the API returns covers array
    if (data?.covers?.[0]) {
      return `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
    }
    // Fallback to OLID
    if (bookID) {
      return `https://covers.openlibrary.org/b/olid/${bookID}-M.jpg`;
    }
    return null;
  };


  // La description peut être un string ou un objet {value: string}
  const getDescription = () => {
    if (!data?.description) return null;
    if (typeof data.description === 'string') {
      return data.description;
    }
    return data.description.value;
  };

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Skeleton variant="rectangular" width={200} height={300} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '60%' }} />
            <Skeleton variant="text" sx={{ width: '80%' }} />
            <Skeleton variant="text" sx={{ width: '80%' }} />
            <Skeleton variant="text" sx={{ width: '60%' }} />
          </Box>
        </Box>
      )}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <Card sx={{ 
	  display: 'flex', 
	  flexDirection: { xs: 'column', md: 'row' }, 
	  gap: 2, 
	  p: 2,
	  maxWidth: 900,      // Limiter la largeur
	  mx: 'auto',
	}}>
          
          
          <CardContent sx={{ 
	    flex: 1, 
	    textAlign:'center'
	  }}>
            {/* Titre */}
            <Typography variant="h4" component="h2" gutterBottom>
              {data.title}
            </Typography>
            
            {/* Auteur.ices */}
            <Box sx={{ 
	      mb: 2, 
	      display:'flex',
	      textAlign:'center',
	      flexDirection:'column',
	      alignItems:'center',
	    }}>
              {data.authors?.map((authorObj, index) => (
                <AuthorDetails key={index} authorKey={authorObj.author.key} />
              ))}
            </Box>     

	    {/* Couverture du livre */}
	    <Box sx={{
	      padding: '1rem',
	      borderRadius: '1rem',
	      backgroundColor: theme.palette.background.paper,
	      flexDirection: 'column',
	      alignItems: 'center',
	      display: 'flex',
	      width:'fit-content',
	      mx:'auto',
	    }}>
	       <CardMedia
		component="img"
		sx={{ 
		  width: { xs: '100%', md: 200 }, 
		  height: { xs: 300, md: 'auto' },
		  objectFit: 'contain',
		  borderRadius: 1, 
		  display:'block',
		  margin:'0 auto',
		  textAlign:'center'
		}}
		image={getCoverUrl() || '/placeholder-book.png'}
		alt={`Couverture de ${data.title}`}
		onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
		  // Image de fallback si la couverture n'existe pas
		  e.currentTarget.src = 'https://via.placeholder.com/200x300?text=No+Cover';
		}}
	      /> 
	    </Box>
            
            {/* Description */}
            {getDescription() ? (
              <Box sx={{
		textAlign:'center'
	      }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" 
		sx={{ 
		  whiteSpace: 'pre-line' , 
		  textAlign:'center'
		}}>
                  {getDescription()}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Aucune description disponible pour ce livre.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default App;


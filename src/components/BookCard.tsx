// Éléments de Material UI, pour faire un truc joli ¬ᴗ¬˵
import {
  Box,
  Typography
} from '@mui/material';           

// Structures de données nécessaires
import type { BookDoc } from '../api_logic/Requests.tsx';

// Import du thème pour faire une belle page
import { useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom'; // Pour les liens (je crois que c'est plus utilisé ici :/')


type BookCardProps = {
  bookData: BookDoc;
  searchTerm: string;
};

export function BookCard({ bookData }: BookCardProps):JSX.Element {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {bookData && (
        <Box>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {bookData.docs.map((book) => (
              <Box
	        onClick={() => navigate(`/book/?id=${book.key.split('/').pop()}`)}
                key={book.key}
                sx={{
		  transition: 'all 0.1s ease',
                  '&:hover': {
		    transform: 'scale(1.05)',
		    cursor: 'pointer',
		  },
		  backgroundColor:theme.palette.background.paper,
                  padding: '1rem',
                  borderRadius: '1rem'
                }}
              >
                {book.title && (
		  <Typography 
		    variant="h5"
		    sx={{
		      height:"5rem",
		    }}>
		    {book.title}
		  </Typography>
		)}
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={`Cover of ${book.title}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '5rem',
                      maxHeight: '25rem',
                      objectFit: 'contain'
                    }}
                  />
                )}

                {book.author_name && (
                  <p><small>par {book.author_name.join(', ')}</small></p>
                )}

                {book.first_publish_year && (
                  <p><small>Première édition: {book.first_publish_year}</small></p>
                )}

                {book.ebook_access === 'public' && (
                  <p><small>Disponible en ligne</small></p>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export function BookSkeleton() {
  return (
    <h1>fuck off m8</h1>
  )
}

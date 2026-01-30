import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useAuthorSearch } from '../api_logic/Requests.tsx';

export function AuthorDetails({ authorKey }: { authorKey: string }) {
  const { data, loading, error } = useAuthorSearch(authorKey);

  const theme = useTheme();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  // Bio can be string or object
  const bio = typeof data.bio === 'string' ? data.bio : data.bio?.value;

  // Photo URL
  const photo = data.photos?.[0] 
    ? `https://covers.openlibrary.org/a/id/${data.photos[0]}-M.jpg` 
    : null;

  return (
    <Box sx={{
      width:"50rem",
      margin:"0 auto",
      textAlign:"center",
      paddingBottom:"10rem",
      backgroundColor:theme.palette.secondary.main,
      padding:"1rem",
      borderRadius:"1rem",
    }}>
      {photo && <img src={photo} alt={data.name} />}
      <h3>{data.name}</h3>
      {data.birth_date && <p>Born: {data.birth_date}</p>}
      {data.death_date && <p>Died: {data.death_date}</p>}
      {bio && <p>{bio}</p>}
    </Box>
  );
}

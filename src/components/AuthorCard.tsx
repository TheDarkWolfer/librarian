import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAuthorSearch } from '../api_logic/Requests.tsx';

import { rmTerf } from '../assets/activism.tsx';

export function AuthorDetails({ authorKey }: { authorKey: string }) {
  const { data, loading, error } = useAuthorSearch(authorKey);

  const theme = useTheme();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!data) return null;

  // On fait ce qu'on peut avec la biographie...
  const bio = typeof data.bio === 'string' ? data.bio : data.bio?.value;

  // Photo URL
  const photo = data.photos?.[0] 
    ? `https://covers.openlibrary.org/a/id/${data.photos[0]}-M.jpg` 
    : null;


    const yeetTerf = rmTerf(data.name);

  return (
    <Box sx={{
      width:"50rem",
      margin:"0 auto",
      textAlign:"center",
      paddingBottom:"10rem",
      backgroundColor:theme.palette.background.paper,
      padding:"1rem",
      borderRadius:"1rem",
    }}>
      {photo && <img src={photo} alt={data.name} />}
      <h3>{data.name}</h3>
      {yeetTerf && yeetTerf}
      {data.birth_date && <Typography>Born: {data.birth_date}</Typography>}
      {data.death_date && <Typography>Died: {data.death_date}</Typography>}
      {bio && <Typography>{bio}</Typography>}
    </Box>
  );
}

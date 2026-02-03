import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';


interface ActionCardProps {
  text: string;
  description: string;
  link: string;
  color: string;
}

export function ActionCard({ text, description, link, color }: ActionCardProps):JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Box
	onClick={() => navigate(link)}
	sx={{
	  backgroundColor:color,
	  borderRadius:"3rem", 
	  transition: 'all 0.3s ease',
	  '&:hover': {
	    transform: 'scale(1.05)',
	    cursor: 'pointer',
	  },
	}}
      >
	<Typography>
	  {text}
	</Typography>	

	<Typography>
	  {description}
	</Typography>
      </Box>
    </>
  )
} 

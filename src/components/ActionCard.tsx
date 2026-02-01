import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export function ActionCard(text:string,description:string,link:string,color:string):JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Box
	onClick={() => navigate(link)}
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

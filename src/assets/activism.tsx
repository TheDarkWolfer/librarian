import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

// Fun fact ! JK Rowling est la raison pour laquelle je ne peux pas mettre les pieds en Angleterre sans risquer de me faire, et je déconne à peine, agresser sexuellement par un policier, juste pour le lol. De plus, cette femme contribue ouvertement à notre génocide, et ses "actions" pour "protéger" les femmes ont déjà causé préjudice à beacoup de femmes, y compris des femmes comme moi, qui avaient eu le malheur de ne pas sembler assez féminines à la mauvaise personne. Donc, si quelqu'un s'intéresse à elle à travers mon site, qui n'est pas tenu à une quelconque neutralité politique à ma connaissance, je vais pas me gêner pour faire ma partie du boulot
function checkAuthor(AuthorName:string):boolean {
  const normalizedInput = AuthorName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  // Permutations de "J.K. Rowling"
  const sheWhoMustNotBeNamed = [
    'jkrowling',
    'rowlingjk',
    'j.k.rowling',
    'j k rowling',
    'rowlingj.k.',
    'joannekrowling',
    'jrowling',
    'j.k.rolling',
    'j.k.roling',
  ];

  return sheWhoMustNotBeNamed.includes(normalizedInput);
}

export function rmTerf(AuthorName:string) {
  if (import.meta.env.VITE_ENABLE_ACTIVISM == 'false') return null; // killswitch
  if (!checkAuthor(AuthorName)) { return null ; }
    // https://www.ms.now/opinion/msnbc-opinion/jk-rowling-uk-trans-women-ruling-rcna201947
    // https://en.wikipedia.org/wiki/Political_views_of_J._K._Rowling // just look at the second fucking paragraph
    // https://en.wikipedia.org/wiki/Political_views_of_J._K._Rowling#Transgender_people
    // https://theweek.com/feature/1020838/jk-rowlings-transphobia-controversy-a-complete-timeline
    // https://www.them.us/story/timeline-jk-rowlings-descent-into-transphobia
  return (
    <Box
      className="doingMyPart"
      sx={{
	color:"#c4a7e7",
	backgroundColor:"#6e6a86",
	borderRadius:"1rem",
	padding:"0.5rem",
	margin:"0.5rem",
      }}>
      <Typography
	variant="body1" 
	fontWeight="bold"
	>
      Cette autrice est extrèmement transphobe et homophobe par ses prises d'actions. Elle est l'une des plus grandes raisons la transformation de l'Angleterre en ce que certain.es d'entre nous appellent "Terf Island" : "l'Île Anti-Trans", si on traduisait l'idée. Elle contribue à la haine envers nombreux.ses membres de la communauté queer, et ce faisant, je refuse de ne pas vous demander de réfléchir aux actions de cette autrice, et de vous conseiller des organismes plus corrects tels que le Trevor Project, qui aide les jeunes personnes queer, spécifiquement trans, à reçevoir l'assistance dont iels ont besoin, Rainbow Railroad, permettant aux personnes queer de fuir les pays qui les persécutent, ou bien des auteur.ices comme Jammie Dodger, ou Lexie Agresti.
	</Typography>
      <Box sx={{
	borderColor:"#9ccfd8",
      }}>
	<Box sx={{ padding:"0.3rem", display: "flex", gap: 1, justifyContent: "center" }}>
	   <Button
	    sx={{
	      color:"9ccfd8",
	      backgroundColor:"#3e8fb0",
	    }}
	    variant="outlined"
	    size="small"
	    href="https://www.thetrevorproject.org/"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    The Trevor Project
	  </Button>     
	  <Button
	    sx={{
	      color:"9ccfd8",
	      backgroundColor:"#3e8fb0",
	    }}variant="outlined"
	    size="small"
	    href="https://www.rainbowrailroad.org/"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    Rainbow Railroad
	  </Button>
      </Box>
      <Box sx={{ padding:"0.3rem", display: "flex", gap: 1, justifyContent: "center" }}>
	  <Button
	    sx={{
	      backgroundColor:"#eb6f92",
	      color:"#e0def4"
	    }}
	    variant="outlined"
	    size="small"
	    href="https://www.youtube.com/@Jammidodger"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    <YouTubeIcon/> Jamie Dodger
	  </Button>
	  <Button
	    sx={{
	      backgroundColor:"#ea9a97",
	      color:"#e0def4"
	    }}
	    variant="outlined"
	    size="small"
	    href="https://www.instagram.com/aggressively_trans/"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    <InstagramIcon/> Lexie Agresti
	  </Button>
	</Box>

	<Box sx={{ padding:"0.3rem", display: "flex", gap: 1, justifyContent: "center" }}>
	  <Button
	    variant="outlined"
	    size="small"
	    href="https://www.ms.now/opinion/msnbc-opinion/jk-rowling-uk-trans-women-ruling-rcna201947"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    AND
	  </Button>
	  <Button
	    variant="outlined"
	    size="small"
	    href="https://en.wikipedia.org/wiki/Political_views_of_J._K._Rowling"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    I
	  </Button>
	  <Button
	    variant="outlined"
	    size="small"
	    href="https://en.wikipedia.org/wiki/Political_views_of_J._K._Rowling#Transgender_people"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    CITE
	  </Button>
	  <Button
	    variant="outlined"
	    size="small"
	    href="https://theweek.com/feature/1020838/jk-rowlings-transphobia-controversy-a-complete-timeline"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    MY
	  </Button>
	  <Button
	    variant="outlined"
	    size="small"
	    href="https://www.them.us/story/timeline-jk-rowlings-descent-into-transphobia"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    SOURCES
	  </Button>
	</Box>
      </Box>
    </Box>
  )
}


import {useState, useEffect} from 'react'; 

import { useRecentChanges } from '../api_logic/Requests.tsx';

// Je viens d'apprendre que ce type d'imports était valide. 
// Ça fait des jours que j'importe en mode "Wall of Text"...
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Link,
  Stack
} from '@mui/material';
import { AccessTime, Person, Book, Edit } from '@mui/icons-material';

function App() {
  const { data:recentChanges, loading, error } = useRecentChanges(10);  

 return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Recent Open Library Changes
      </Typography>

      <Stack spacing={2}>
        {recentChanges && recentChanges.map((change) => (
          <Card key={change.id} variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip
                  label={change.kind}
                  color={
                    change.kind.includes('book') ? 'success' :
                    change.kind.includes('author') ? 'primary' :
                    'default'
                  }
                  size="small"
                  icon={<Edit fontSize="small" />}
                />
                <Typography variant="caption" color="text.secondary">
                  <AccessTime fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  {new Date(change.timestamp).toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="body2" paragraph>
                {change.comment || 'No comment provided'}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {change.author.key.replace('/people/', '')}
                  </Typography>
                </Box>

                <Box display="flex" gap={1}>
                  {change.changes.map((c) => (
                    <Link
                      key={c.key}
                      href={`https://openlibrary.org${c.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      <Chip
                        label={c.key.split('/').pop()}
                        size="small"
                        icon={<Book fontSize="small" />}
                      />
                    </Link>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default App

import { useState, useEffect } from 'react';
import { useRecentChanges } from '../api_logic/Requests.tsx';
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
  Stack,
  Skeleton
} from '@mui/material';
import { AccessTime, Person, Book, Edit } from '@mui/icons-material';

function App() {
  const { data: recentChanges, loading, error } = useRecentChanges(10);

  // Loading state with skeletons
  if (loading) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width="60%" />
        </Typography>

        <Stack spacing={2}>
          {[...Array(10)].map((_, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                {/* Header with chip and timestamp */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Skeleton variant="circular" width={80} height={24} />
                  <Skeleton variant="text" width={120} />
                </Box>

                {/* Comment section */}
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />

                <Divider sx={{ my: 1 }} />

                {/* Footer with author and items */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width={80} />
                  </Box>
                  <Box display="flex" gap={1}>
                    <Skeleton variant="circular" width={60} height={24} />
                    <Skeleton variant="circular" width={60} height={24} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Empty state
  if (!recentChanges || recentChanges.length === 0) {
    return (
      <Box p={4}>
        <Alert severity="info">No recent changes found</Alert>
      </Box>
    );
  }

  // Success state with actual data
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Recent Open Library Changes
      </Typography>

      <Stack spacing={2}>
        {recentChanges.map((change) => (
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
                      href={`/book/?id=${c.key.split('/').pop()}`}
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

export default App;


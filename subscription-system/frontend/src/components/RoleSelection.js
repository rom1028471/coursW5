import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Person as UserIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

function RoleSelection({ onSelectRole }) {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Добро пожаловать!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Выберите режим входа в систему
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<UserIcon />}
            onClick={() => onSelectRole('user')}
            fullWidth
            sx={{
              py: 3,
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Пользователь
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<AdminIcon />}
            onClick={() => onSelectRole('admin')}
            fullWidth
            sx={{
              py: 3,
              bgcolor: theme.palette.secondary.main,
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
              },
            }}
          >
            Администратор
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RoleSelection;

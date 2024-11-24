import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';

function Navigation() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Subscription System
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Subscriptions
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/payments"
          >
            Payments
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/deliveries"
          >
            Deliveries
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;

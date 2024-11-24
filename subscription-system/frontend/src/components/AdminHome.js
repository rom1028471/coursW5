import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';

function AdminHome() {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: 'Users',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      description: 'Manage system users',
      path: '/admin/users'
    },
    {
      title: 'Publications',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      description: 'Manage publications catalog',
      path: '/admin/publications'
    },
    {
      title: 'Subscriptions',
      icon: <SubscriptionsIcon sx={{ fontSize: 40 }} />,
      description: 'View and manage subscriptions',
      path: '/subscriptions'
    },
    {
      title: 'Deliveries',
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      description: 'Track deliveries',
      path: '/deliveries'
    },
    {
      title: 'Payments',
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
      description: 'Monitor payments',
      path: '/payments'
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {adminModules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
              onClick={() => navigate(module.path)}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {module.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {module.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {module.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminHome;

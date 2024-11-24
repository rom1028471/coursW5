import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile({ user, onLogout, subscriptions, favorites, cartItems }) {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/signin');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Информация о пользователе */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Профиль</Typography>
              <IconButton onClick={handleLogout} color="primary">
                <LogoutIcon />
              </IconButton>
            </Box>
            <Typography variant="body1" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>
          </Paper>
        </Grid>

        {/* Вкладки с контентом */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Подписки" />
              <Tab label="Избранное" />
              <Tab label="Корзина" />
            </Tabs>

            {/* Подписки */}
            <TabPanel value={tabValue} index={0}>
              <List>
                {subscriptions?.map((subscription) => (
                  <React.Fragment key={subscription.id}>
                    <ListItem>
                      <ListItemText
                        primary={subscription.title}
                        secondary={`Действует до: ${new Date(subscription.expiryDate).toLocaleDateString()}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {/* TODO: Продлить подписку */}}
                      >
                        Продлить
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            {/* Избранное */}
            <TabPanel value={tabValue} index={1}>
              <List>
                {favorites?.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.price} ₽`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            {/* Корзина */}
            <TabPanel value={tabValue} index={2}>
              <List>
                {cartItems?.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.price} ₽`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              {cartItems?.length > 0 && (
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {/* TODO: Оформить заказ */}}
                  >
                    Оформить заказ
                  </Button>
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import axios from 'axios';

const SAMPLE_PUBLICATIONS = [
  {
    id: 1,
    title: "Ежедневные новости",
    description: "Ваш ежедневный источник последних новостей и обновлений",
    price: 499,
    imageUrl: "https://source.unsplash.com/random/800x600/?newspaper",
    type: "NEWSPAPER"
  },
  {
    id: 2,
    title: "Наука и жизнь",
    description: "Углубленное освещение научных открытий и инноваций",
    price: 799,
    imageUrl: "https://source.unsplash.com/random/800x600/?science",
    type: "MAGAZINE"
  },
  {
    id: 3,
    title: "Мир технологий",
    description: "Будьте в курсе последних технологических новинок",
    price: 699,
    imageUrl: "https://source.unsplash.com/random/800x600/?technology",
    type: "MAGAZINE"
  }
];

function UserHome() {
  const [publications] = useState(SAMPLE_PUBLICATIONS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState({
    duration: 3,
    address: ''
  });

  const handleSubscribe = (publication) => {
    setSelectedPublication(publication);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPublication(null);
    setSubscriptionData({
      duration: 3,
      address: ''
    });
  };

  const calculateEndDate = (startDate, months) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  };

  const handleSubmitSubscription = async () => {
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = calculateEndDate(startDate, subscriptionData.duration);

      const subscription = {
        publicationTitle: selectedPublication.title,
        userName: "User", // В будущем будет браться из системы аутентификации
        startDate: startDate,
        endDate: endDate,
        status: "ACTIVE",
        address: subscriptionData.address
      };

      await axios.post('/api/subscriptions', subscription);
      handleCloseDialog();
      // Добавим alert для подтверждения
      alert('Подписка успешно оформлена!');
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Произошла ошибка при оформлении подписки. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Доступные издания
      </Typography>
      <Grid container spacing={4}>
        {publications.map((publication) => (
          <Grid item key={publication.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={publication.imageUrl}
                alt={publication.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {publication.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {publication.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {publication.price} ₽/месяц
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubscribe(publication)}
                >
                  Подписаться
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Подписка на {selectedPublication?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Срок подписки</InputLabel>
              <Select
                value={subscriptionData.duration}
                onChange={(e) => setSubscriptionData({
                  ...subscriptionData,
                  duration: e.target.value
                })}
                label="Срок подписки"
              >
                <MenuItem value={3}>3 месяца</MenuItem>
                <MenuItem value={6}>6 месяцев</MenuItem>
                <MenuItem value={12}>12 месяцев</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Адрес доставки"
              value={subscriptionData.address}
              onChange={(e) => setSubscriptionData({
                ...subscriptionData,
                address: e.target.value
              })}
              margin="normal"
              required
              multiline
              rows={2}
            />
            {selectedPublication && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                Итоговая стоимость: {selectedPublication.price * subscriptionData.duration} ₽
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button 
            onClick={handleSubmitSubscription} 
            variant="contained"
            disabled={!subscriptionData.address}
          >
            Оформить подписку
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserHome;

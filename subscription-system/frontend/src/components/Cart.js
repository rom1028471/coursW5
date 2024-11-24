import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.duration, 0);
  };

  const handleCheckout = async () => {
    try {
      // Здесь будет логика оформления всех подписок
      const subscriptions = cartItems.map(item => ({
        publicationTitle: item.title,
        startDate: new Date().toISOString().split('T')[0],
        endDate: calculateEndDate(new Date(), item.duration),
        status: 'ACTIVE',
        price: item.price * item.duration
      }));

      // В будущем здесь будет API запрос
      console.log('Creating subscriptions:', subscriptions);
      clearCart();
      navigate('/profile/subscriptions');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Произошла ошибка при оформлении подписок');
    }
  };

  const calculateEndDate = (startDate, months) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Корзина пуста
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Перейти к каталогу
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Корзина
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={item.title}
                secondary={`${item.duration} мес. × ${item.price} ₽ = ${item.price * item.duration} ₽`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeFromCart(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Итого: {calculateTotal()} ₽
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            sx={{ mt: 2 }}
          >
            Оформить подписки
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Cart;

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as AnalyticsIcon,
  LibraryBooks as PublicationsIcon,
  Comment as ReviewsIcon,
  Email as EmailIcon,
  AttachMoney as RevenueIcon,
  LocalShipping as DeliveryIcon,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Примеры данных для статистики
const statistics = {
  activeSubscriptions: 1250,
  monthlyRevenue: 875000,
  newSubscribers: 45,
  pendingDeliveries: 128,
  totalPublications: 10,
  pendingReviews: 23,
};

function AdminHome() {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: 'Аналитика',
      icon: <AnalyticsIcon fontSize="large" />,
      description: 'Статистика и отчеты по подпискам',
      path: '/admin/analytics',
      stats: `${statistics.activeSubscriptions} активных подписок`,
    },
    {
      title: 'Публикации',
      icon: <PublicationsIcon fontSize="large" />,
      description: 'Управление изданиями и контентом',
      path: '/admin/publications',
      stats: `${statistics.totalPublications} изданий`,
    },
    {
      title: 'Отзывы',
      icon: <ReviewsIcon fontSize="large" />,
      description: 'Модерация отзывов пользователей',
      path: '/admin/reviews',
      stats: `${statistics.pendingReviews} на модерации`,
    },
    {
      title: 'Рассылки',
      icon: <EmailIcon fontSize="large" />,
      description: 'Управление email-рассылками',
      path: '/admin/newsletters',
      stats: 'Настройка кампаний',
    },
    {
      title: 'Доставка',
      icon: <DeliveryIcon fontSize="large" />,
      description: 'Управление доставками',
      path: '/admin/deliveries',
      stats: `${statistics.pendingDeliveries} ожидают`,
    },
    {
      title: 'Пользователи',
      icon: <PeopleIcon fontSize="large" />,
      description: 'Управление пользователями',
      path: '/admin/users',
      stats: `+${statistics.newSubscribers} новых`,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Сводка статистики */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Выручка за месяц</Typography>
                  <RevenueIcon fontSize="large" />
                </Box>
                <Typography variant="h4">
                  {statistics.monthlyRevenue.toLocaleString()} ₽
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'secondary.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Активные подписки</Typography>
                  <PeopleIcon fontSize="large" />
                </Box>
                <Typography variant="h4">
                  {statistics.activeSubscriptions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Новые подписчики</Typography>
                  <TrendingUp fontSize="large" />
                </Box>
                <Typography variant="h4">
                  +{statistics.newSubscribers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Карточки разделов */}
      <Grid container spacing={3}>
        {adminCards.map((card) => (
          <Grid item key={card.title} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton color="primary" sx={{ mr: 1 }}>
                    {card.icon}
                  </IconButton>
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {card.description}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {card.stats}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(card.path)}
                  sx={{ ml: 1 }}
                >
                  Перейти
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminHome;

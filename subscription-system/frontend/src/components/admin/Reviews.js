import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';

// Примеры данных для отзывов
const reviews = [
  {
    id: 1,
    publicationTitle: 'Газета 1',
    userName: 'Иван Петров',
    rating: 4,
    content: 'Отличное издание, всегда интересные статьи!',
    status: 'pending',
    date: '2024-01-20',
  },
  {
    id: 2,
    publicationTitle: 'Журнал 2',
    userName: 'Мария Сидорова',
    rating: 5,
    content: 'Прекрасный журнал, спасибо за качественный контент.',
    status: 'approved',
    date: '2024-01-19',
  },
  {
    id: 3,
    publicationTitle: 'Газета 2',
    userName: 'Алексей Иванов',
    rating: 2,
    content: 'Много рекламы, мало полезного контента.',
    status: 'rejected',
    date: '2024-01-18',
  },
];

function Reviews() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleReviewAction = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedReview(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'На модерации';
      case 'approved':
        return 'Одобрен';
      case 'rejected':
        return 'Отклонен';
      default:
        return status;
    }
  };

  const filteredReviews = reviews.filter(
    (review) => filterStatus === 'all' || review.status === filterStatus
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Модерация отзывов</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={filterStatus}
            label="Статус"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="pending">На модерации</MenuItem>
            <MenuItem value="approved">Одобренные</MenuItem>
            <MenuItem value="rejected">Отклоненные</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {/* Статистика отзывов */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    На модерации
                  </Typography>
                  <Typography variant="h4">5</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Средняя оценка
                  </Typography>
                  <Typography variant="h4">4.2</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Всего отзывов
                  </Typography>
                  <Typography variant="h4">150</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Таблица отзывов */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Издание</TableCell>
                  <TableCell>Пользователь</TableCell>
                  <TableCell>Оценка</TableCell>
                  <TableCell>Отзыв</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.publicationTitle}</TableCell>
                    <TableCell>{review.userName}</TableCell>
                    <TableCell>
                      <Rating value={review.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>{review.content}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(review.status)}
                        color={getStatusColor(review.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {review.status === 'pending' && (
                        <Box>
                          <Button
                            startIcon={<ApproveIcon />}
                            color="success"
                            size="small"
                            onClick={() => handleReviewAction(review)}
                          >
                            Одобрить
                          </Button>
                          <Button
                            startIcon={<RejectIcon />}
                            color="error"
                            size="small"
                            onClick={() => handleReviewAction(review)}
                          >
                            Отклонить
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Диалог модерации */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Модерация отзыва</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Издание: {selectedReview?.publicationTitle}
                </Typography>
                <Typography variant="subtitle1">
                  Пользователь: {selectedReview?.userName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    Оценка:
                  </Typography>
                  <Rating value={selectedReview?.rating} readOnly />
                </Box>
                <Typography variant="subtitle1">Отзыв:</Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                  <Typography>{selectedReview?.content}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Комментарий модератора"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<ApproveIcon />}
            onClick={handleClose}
          >
            Одобрить
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<RejectIcon />}
            onClick={handleClose}
          >
            Отклонить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Reviews;

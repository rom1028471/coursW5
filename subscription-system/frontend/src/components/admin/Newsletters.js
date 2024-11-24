import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';

// Примеры данных для рассылок
const newsletters = [
  {
    id: 1,
    title: 'Новые выпуски журналов',
    type: 'digest',
    status: 'scheduled',
    scheduledDate: '2024-02-01',
    recipients: 1250,
  },
  {
    id: 2,
    title: 'Специальное предложение',
    type: 'promo',
    status: 'draft',
    scheduledDate: null,
    recipients: 800,
  },
  {
    id: 3,
    title: 'Обновление условий подписки',
    type: 'notification',
    status: 'sent',
    scheduledDate: '2024-01-15',
    recipients: 1500,
  },
];

function Newsletters() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  const handleCreateNew = () => {
    setSelectedNewsletter(null);
    setOpenDialog(true);
  };

  const handleEdit = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedNewsletter(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'scheduled':
        return 'primary';
      case 'sent':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'draft':
        return 'Черновик';
      case 'scheduled':
        return 'Запланировано';
      case 'sent':
        return 'Отправлено';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Управление рассылками</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleCreateNew}
        >
          Создать рассылку
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Статистика рассылок */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Всего подписчиков
                  </Typography>
                  <Typography variant="h4">1,500</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Средний open rate
                  </Typography>
                  <Typography variant="h4">45%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Активные рассылки
                  </Typography>
                  <Typography variant="h4">3</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Таблица рассылок */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Дата отправки</TableCell>
                  <TableCell>Получатели</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newsletters.map((newsletter) => (
                  <TableRow key={newsletter.id}>
                    <TableCell>{newsletter.title}</TableCell>
                    <TableCell>{newsletter.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(newsletter.status)}
                        color={getStatusColor(newsletter.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {newsletter.scheduledDate || 'Не запланировано'}
                    </TableCell>
                    <TableCell>{newsletter.recipients}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(newsletter)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Диалог создания/редактирования рассылки */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedNewsletter ? 'Редактировать рассылку' : 'Создать рассылку'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Название рассылки"
                  defaultValue={selectedNewsletter?.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Тип рассылки</InputLabel>
                  <Select
                    defaultValue={selectedNewsletter?.type || 'digest'}
                    label="Тип рассылки"
                  >
                    <MenuItem value="digest">Дайджест</MenuItem>
                    <MenuItem value="promo">Промо</MenuItem>
                    <MenuItem value="notification">Уведомление</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Дата отправки"
                  type="date"
                  defaultValue={selectedNewsletter?.scheduledDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Содержание"
                  multiline
                  rows={4}
                  defaultValue={selectedNewsletter?.content}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            {selectedNewsletter ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Newsletters;

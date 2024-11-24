import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Примеры данных для графиков
const subscriptionData = [
  { name: 'Янв', subscriptions: 400 },
  { name: 'Фев', subscriptions: 300 },
  { name: 'Мар', subscriptions: 600 },
  { name: 'Апр', subscriptions: 800 },
  { name: 'Май', subscriptions: 700 },
  { name: 'Июн', subscriptions: 900 },
];

const publicationData = [
  { name: 'Газета 1', value: 400 },
  { name: 'Газета 2', value: 300 },
  { name: 'Журнал 1', value: 300 },
  { name: 'Журнал 2', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Analytics() {
  const [period, setPeriod] = React.useState('month');

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Аналитика
      </Typography>

      {/* Фильтры */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Период</InputLabel>
          <Select
            value={period}
            label="Период"
            onChange={(e) => setPeriod(e.target.value)}
          >
            <MenuItem value="week">Неделя</MenuItem>
            <MenuItem value="month">Месяц</MenuItem>
            <MenuItem value="quarter">Квартал</MenuItem>
            <MenuItem value="year">Год</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {/* График подписок */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Динамика подписок
            </Typography>
            <LineChart
              width={800}
              height={300}
              data={subscriptionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="subscriptions"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Paper>
        </Grid>

        {/* Статистика по изданиям */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Популярность изданий
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={publicationData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {publicationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Ключевые метрики */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Ключевые метрики
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color="textSecondary">
                        Конверсия подписок
                      </Typography>
                      <Typography variant="h4">8.5%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="textSecondary">
                        Средний чек
                      </Typography>
                      <Typography variant="h4">2,450₽</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="textSecondary">
                        Активные подписки
                      </Typography>
                      <Typography variant="h4">1,250</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="textSecondary">
                        Отток
                      </Typography>
                      <Typography variant="h4">2.3%</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Analytics;

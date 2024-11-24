import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

// Пример данных публикаций
const SAMPLE_PUBLICATIONS = [
  // Газеты
  {
    id: 1,
    title: "Ежедневные новости",
    type: "NEWSPAPER",
    category: "Новости",
    description: "Ежедневная газета с последними новостями политики, экономики и общества",
    price: 499,
    imageUrl: "https://source.unsplash.com/random/800x600/?newspaper",
    tags: ["Политика", "Экономика", "Общество"],
    preview: "Специальный выпуск о развитии технологий",
    archive: ["2024-01", "2024-02"],
    exclusive: true
  },
  {
    id: 2,
    title: "Деловой вестник",
    type: "NEWSPAPER",
    category: "Бизнес",
    description: "Ведущая деловая газета с анализом рынков и бизнес-новостями",
    price: 699,
    imageUrl: "https://source.unsplash.com/random/800x600/?business",
    tags: ["Бизнес", "Финансы", "Аналитика"],
    preview: "Интервью с ведущими предпринимателями",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  {
    id: 3,
    title: "Спортивное обозрение",
    type: "NEWSPAPER",
    category: "Спорт",
    description: "Все новости спорта, репортажи с матчей и аналитика",
    price: 399,
    imageUrl: "https://source.unsplash.com/random/800x600/?sport",
    tags: ["Спорт", "Футбол", "Хоккей"],
    preview: "Обзор главных спортивных событий",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  {
    id: 4,
    title: "Культурная жизнь",
    type: "NEWSPAPER",
    category: "Культура",
    description: "Новости культуры, театра, кино и искусства",
    price: 449,
    imageUrl: "https://source.unsplash.com/random/800x600/?culture",
    tags: ["Культура", "Искусство", "Театр"],
    preview: "Анонсы культурных событий",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  {
    id: 5,
    title: "Городской вестник",
    type: "NEWSPAPER",
    category: "Городские новости",
    description: "Новости города, объявления и афиша мероприятий",
    price: 299,
    imageUrl: "https://source.unsplash.com/random/800x600/?city",
    tags: ["Город", "События", "Афиша"],
    preview: "Главные городские события недели",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  // Журналы
  {
    id: 6,
    title: "Наука и жизнь",
    type: "MAGAZINE",
    category: "Наука",
    description: "Научно-популярный журнал о последних открытиях и исследованиях",
    price: 799,
    imageUrl: "https://source.unsplash.com/random/800x600/?science",
    tags: ["Наука", "Технологии", "Исследования"],
    preview: "Специальный выпуск о космических исследованиях",
    archive: ["2024-01", "2024-02"],
    exclusive: true
  },
  {
    id: 7,
    title: "Мир технологий",
    type: "MAGAZINE",
    category: "Технологии",
    description: "Все о новых технологиях, гаджетах и инновациях",
    price: 699,
    imageUrl: "https://source.unsplash.com/random/800x600/?technology",
    tags: ["Технологии", "Гаджеты", "Инновации"],
    preview: "Обзор новейших технологических трендов",
    archive: ["2024-01", "2024-02"],
    exclusive: true
  },
  {
    id: 8,
    title: "Дом и сад",
    type: "MAGAZINE",
    category: "Хобби",
    description: "Журнал о домашнем уюте, садоводстве и дизайне",
    price: 549,
    imageUrl: "https://source.unsplash.com/random/800x600/?garden",
    tags: ["Дом", "Сад", "Дизайн"],
    preview: "Весенние советы по уходу за садом",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  {
    id: 9,
    title: "Кулинарные истории",
    type: "MAGAZINE",
    category: "Кулинария",
    description: "Рецепты, кулинарные советы и гастрономические путешествия",
    price: 599,
    imageUrl: "https://source.unsplash.com/random/800x600/?cooking",
    tags: ["Кулинария", "Рецепты", "Гастрономия"],
    preview: "Специальный выпуск о национальных кухнях",
    archive: ["2024-01", "2024-02"],
    exclusive: false
  },
  {
    id: 10,
    title: "Мода и стиль",
    type: "MAGAZINE",
    category: "Мода",
    description: "Журнал о моде, стиле и красоте",
    price: 749,
    imageUrl: "https://source.unsplash.com/random/800x600/?fashion",
    tags: ["Мода", "Стиль", "Красота"],
    preview: "Тренды нового сезона",
    archive: ["2024-01", "2024-02"],
    exclusive: true
  }
];

function Publications({ onAddToCart, onToggleFavorite, favorites = [] }) {
  const [publications] = useState(SAMPLE_PUBLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showExclusive] = useState(false);
  const [previewDialog, setPreviewDialog] = useState({ open: false, publication: null });

  // Получаем уникальные категории и теги
  const categories = [...new Set(publications.map(pub => pub.category))];
  const allTags = [...new Set(publications.flatMap(pub => pub.tags))];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || pub.type === selectedType;
    const matchesCategory = !selectedCategory || pub.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => pub.tags.includes(tag));
    const matchesExclusive = !showExclusive || pub.exclusive;

    return matchesSearch && matchesType && matchesCategory && matchesTags && matchesExclusive;
  });

  const handlePreviewClick = (publication) => {
    setPreviewDialog({ open: true, publication });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Фильтры */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Тип</InputLabel>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="NEWSPAPER">Газеты</MenuItem>
                <MenuItem value="MAGAZINE">Журналы</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Теги</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {allTags.map(tag => (
                  <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Список публикаций */}
      <Grid container spacing={4}>
        {filteredPublications.map((publication) => (
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
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {publication.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {publication.price} ₽/месяц
                </Typography>
                {publication.exclusive && (
                  <Chip
                    label="Эксклюзив"
                    color="secondary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() => handlePreviewClick(publication)}
                >
                  Предпросмотр
                </Button>
                <Box>
                  <IconButton
                    onClick={() => onToggleFavorite(publication)}
                    color={favorites.some(fav => fav.id === publication.id) ? "secondary" : "default"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onAddToCart(publication)}
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Диалог предпросмотра */}
      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, publication: null })}
        maxWidth="md"
        fullWidth
      >
        {previewDialog.publication && (
          <>
            <DialogTitle>{previewDialog.publication.title}</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                Превью свежего выпуска
              </Typography>
              <Typography paragraph>
                {previewDialog.publication.preview}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Архив выпусков
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {previewDialog.publication.archive.map(date => (
                  <Chip key={date} label={date} />
                ))}
              </Box>
              
              {previewDialog.publication.exclusive && (
                <>
                  <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                    Эксклюзивные материалы
                  </Typography>
                  <Typography>
                    Доступны специальные материалы для подписчиков
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPreviewDialog({ open: false, publication: null })}>
                Закрыть
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  onAddToCart(previewDialog.publication);
                  setPreviewDialog({ open: false, publication: null });
                }}
              >
                Добавить в корзину
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default Publications;

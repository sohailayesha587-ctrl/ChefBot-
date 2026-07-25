const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const beginnersGuideRoutes = require('./routes/BeginnersGuideRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
const pantryShoppingRoutes = require('./routes/pantryShoppingRoutes');
const mealSuggestionRoutes = require('./routes/mealSuggestionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/guides', beginnersGuideRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/pantry-shopping', pantryShoppingRoutes);
app.use('/api/meal-suggestions', mealSuggestionRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const beginnersGuideRoutes = require('./routes/BeginnersGuideRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
const pantryShoppingRoutes = require('./routes/pantryShoppingRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const mealSuggestionRoutes = require('./routes/mealSuggestionRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminMiddleware = require('./middleware/adminMiddleware');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/beginners-guides', beginnersGuideRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/pantry-shopping', pantryShoppingRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/meal-suggestions', mealSuggestionRoutes);
app.use('/api/users', settingsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api/admin', adminMiddleware, adminRoutes);

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;

  res.json({
    success: true,
    server: 'running',
    mongodb: dbStatus === 1 ? 'connected' : 'disconnected',
    mongodbReadyState: dbStatus
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });
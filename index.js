const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { protect, adminOnly } = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const pantryShoppingRoutes = require('./routes/pantryShoppingRoutes');
const mealSuggestionRoutes = require('./routes/mealSuggestionRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const timerRoutes = require('./routes/timerRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const beginnersGuideRoutes = require('./routes/beginnersGuideRoutes');
const applianceRoutes = require('./routes/applianceRoutes');
const userRoutes = require('./routes/userRoutes');

// ======================
// NEW - DAILY REPORT ROUTES
// ======================
const dailyReportRoutes = require('./routes/dailyReportRoutes');

// ======================
// CRON JOB (Notification Scheduler)
// ======================
const { startCronJobs } = require('./cronJobs');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ======================
// PUBLIC ROUTES
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/appliances', applianceRoutes);

// ======================
// PROTECTED ROUTES (require login)
// ======================
app.use('/api/pantry', protect, pantryRoutes);
app.use('/api/shopping', protect, shoppingRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/pantry-shopping', protect, pantryShoppingRoutes);
app.use('/api/meal-suggestions', protect, mealSuggestionRoutes);
app.use('/api/mealplan', protect, mealPlanRoutes);
app.use('/api/timers', protect, timerRoutes);
app.use('/api/settings', protect, settingsRoutes);
app.use('/api/beginners-guide', protect, beginnersGuideRoutes);
app.use('/api/users', protect, userRoutes);

// ======================
// NEW - DAILY REPORT ROUTES
// ======================
app.use('/api/daily-report', protect, dailyReportRoutes);

// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {
  res.send('ChefBot Server is Running!');
});

// ======================
// MongoDB Connection & Server Start
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    
    // ✅ Start cron jobs ONLY after DB is connected
    startCronJobs();
    
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:', err);
  });
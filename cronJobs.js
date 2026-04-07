const cron = require('node-cron');
const User = require('./models/User');
const DailyReport = require('./models/DailyReport');

// Schedule cron job for 9 PM daily
cron.schedule('0 21 * * *', async () => {
  console.log('🔔 Running daily report cron job at 9 PM...');
  
  try {
    // Get all users with reminders enabled
    const users = await User.find({ 'reportPreferences.enableReminders': true });
    
    console.log(`📢 Found ${users.length} users with reminders enabled`);
    
    for (const user of users) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let report = await DailyReport.findOne({ 
        userId: user._id, 
        date: today 
      });
      
      // Check if user hasn't answered today
      if (!report || report.userReply?.status === 'pending') {
        
        // Update last reminder sent time
        user.reportPreferences.lastReminderSent = new Date();
        await user.save();
        
        console.log(`📢 Reminder sent to user: ${user.email}`);
        
        // TODO: Yahan frontend ko notification send karna hai
        // Abhi ke liye sirf console log hai
        // Baad mein WebSocket ya Push Notification implement kar sakte ho
      }
    }
    
    console.log('✅ Cron job completed at', new Date().toLocaleTimeString());
    
  } catch (error) {
    console.error('❌ Cron job error:', error);
  }
}, {
  timezone: "Asia/Karachi" // Pakistan timezone
});

// Also run at 9 AM to check missed reports
cron.schedule('0 9 * * *', async () => {
  console.log('🔔 Running missed reports check at 9 AM...');
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const pendingReports = await DailyReport.find({
      'userReply.status': 'pending',
      date: { $lt: today, $gte: threeDaysAgo }
    }).populate('userId', 'name email reportPreferences');
    
    for (const report of pendingReports) {
      const daysPending = Math.floor((today - report.date) / (1000 * 60 * 60 * 24));
      const autoMarkDays = report.userId?.reportPreferences?.autoMarkAfterDays || 2;
      
      if (daysPending >= autoMarkDays) {
        report.userReply.status = 'skipped';
        report.summary = `Auto-skipped after ${daysPending} days - no response from user`;
        await report.save();
        
        // Log missed report
        await report.userId.logMissedReport(report.date, 'auto_filled');
        
        console.log(`✅ Auto-skipped report for user ${report.userId.email} for date ${report.date}`);
      }
    }
    
    console.log(`✅ Missed reports check completed. Processed ${pendingReports.length} reports`);
    
  } catch (error) {
    console.error('❌ Missed reports check error:', error);
  }
}, {
  timezone: "Asia/Karachi"
});

// Function to start cron jobs
const startCronJobs = () => {
  console.log('⏰ Cron jobs started successfully!');
  console.log('   - Daily report reminder: 9:00 PM');
  console.log('   - Missed reports check: 9:00 AM');
};

module.exports = { startCronJobs };
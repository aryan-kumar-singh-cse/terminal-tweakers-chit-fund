const express = require('express');
const cors = require('cors');

// Import routes
const groupsRoute = require('./routes/groups');
const membersRoute = require('./routes/members');
const contributionsRoute = require('./routes/contributions');
const auctionsRoute = require('./routes/auctions');
const exportRoute = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is up and running' });
});

// Route setup
app.use('/api/groups', groupsRoute);
app.use('/api/members', membersRoute);
app.use('/api/contributions', contributionsRoute);
app.use('/api/auctions', auctionsRoute);
app.use('/api/export', exportRoute);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

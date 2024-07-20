// @packages
import express from 'express';

// @own
import apiRoutes from './routes/api/index.js';
import errorHandler from './middlewares/errorHandler.js';
import setHeaders from './middlewares/setHeaders.js';

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(setHeaders);
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

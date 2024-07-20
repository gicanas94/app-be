// @packages
import express from 'express';

// @own
import v1Router from './v1/index.js';

const router = express.Router();

router.use('/v1', v1Router);

export default router;

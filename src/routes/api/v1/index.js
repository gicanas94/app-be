// @packages
import express from 'express';

// @app
import { download } from '#controllers/download.js';
import { sayHello } from '#controllers/helloWorld.js';

const router = express.Router();

router.get('/download', download);
router.get('/hello-world', sayHello);

export default router;

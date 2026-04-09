import { Router, Request, Response } from 'express';
import productsRouter from './products.routes';
import movementsRouter from './movements.routes';
import dashboardRouter from './dashboard.routes';

const router = Router();

/**
 * @route GET /api/v1/health
 * @description Health check endpoint to verify API availability
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString()
    }
  });
});

router.use('/products', productsRouter);
router.use('/movements', movementsRouter);
router.use('/dashboard', dashboardRouter);

export default router;

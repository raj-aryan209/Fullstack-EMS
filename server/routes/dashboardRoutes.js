import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashboardController.js";

const dashboardRoutes = Router()

dashboardRouter.get('/', protect,getDashboard)

export default dashboardRouter; 

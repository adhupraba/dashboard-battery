import { Router } from "express";
import { register, login, createAlert, getChartData, deleteAlert, getAlerts } from "../controllers";
import { validateRequest } from "../middlewares";
import * as validation from "../validation";

const router = Router();

// auth
router.post("/register", validation.registerUser, validateRequest, register);
router.post("/login", validation.loginUser, validateRequest, login);

// alert
router.get("/alerts", getAlerts);
router.post("/alert", validation.createAlert, validateRequest, createAlert);
router.delete("/alert", validation.deleteAlert, validateRequest, deleteAlert);

// chart
router.get("/chart", getChartData);

export default router;

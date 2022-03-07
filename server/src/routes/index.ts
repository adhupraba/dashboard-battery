import { Router } from "express";
import { register, login, createAlert, getChartData, deleteAlert, getAlerts } from "../controllers";
import { validateRequest } from "../middlewares";
import { authentication } from "../middlewares/auth";
import * as validation from "../validation";

const router = Router();

// auth
router.post("/register", validation.registerUser, validateRequest, register);
router.post("/login", validation.loginUser, validateRequest, login);

// alert
router.get("/alerts", authentication, getAlerts);
router.post("/alert", authentication, validation.createAlert, validateRequest, createAlert);
router.delete("/alert", authentication, validation.deleteAlert, validateRequest, deleteAlert);

// chart
router.get("/chart", authentication, getChartData);

export default router;

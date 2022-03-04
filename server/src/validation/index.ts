import { body } from "express-validator";

export const registerUser = [
  body("name").not().isEmpty().trim().withMessage("Name must be provided"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
];

export const loginUser = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password must be provided"),
];

export const createAlert = [
  body("name").not().isEmpty().trim().withMessage("Name must be provided"),
  body("criteria").not().isEmpty().withMessage("Criteria must be provided"),
  body("criteriaValue").not().isEmpty().isInt().withMessage("Criteria value must be provided"),
  body("dayType").not().isEmpty().withMessage("Day type must be provided"),
  body("priceSignal").not().isEmpty().withMessage("Price signal must be provided"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("phone").isNumeric().isLength({ min: 10, max: 10 }).withMessage("Phone must be valid 10 digit number"),
];

export const deleteAlert = [body("id").not().isEmpty().isInt().withMessage("Alert id must be provided")];

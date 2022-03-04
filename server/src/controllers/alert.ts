import { NextFunction, Request, Response } from "express";
import { Alert } from "../models";

export const getAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await Alert.findAll();
    return res.status(200).send({ success: true, alerts });
  } catch (err: any) {
    next(err);
  }
};

export const createAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, criteria, criteriaValue, dayType, priceSignal, email, phone } = req.body;

    const alert = await Alert.create({
      name,
      criteria,
      criteriaValue,
      dayType,
      priceSignal,
      email,
      phone,
    });
    return res.status(200).send({ success: true, id: alert.id });
  } catch (err: any) {
    next(err);
  }
};

export const deleteAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    await Alert.destroy({
      where: {
        id,
      },
    });

    return res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
};

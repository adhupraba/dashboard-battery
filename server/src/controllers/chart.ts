import { Request, Response } from "express";

export const getChartData = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false });
  }
};

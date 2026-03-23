import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

export const getAllClients = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: String(req.params.id) },
      include: { invoices: true },
    });
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });
    res.json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, company } = req.body;
    if (!name || !email)
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    const client = await prisma.client.create({ data: { name, email, company } });
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const updateClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, company } = req.body;
    const client = await prisma.client.update({
      where: { id: String(req.params.id) },
      data: { name, email, company },
    });
    res.json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const deleteClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.client.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const markOverdue = async () => {
  await prisma.invoice.updateMany({
    where: { status: 'pending', dueDate: { lt: new Date() } },
    data: { status: 'overdue' },
  });
};

export const getAllInvoices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await markOverdue();
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: invoices });
  } catch (error) {
    next(error);
  }
};

export const getInvoiceStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await markOverdue();
    const [total, paid, pending, overdue] = await Promise.all([
      prisma.invoice.aggregate({ _count: true, _sum: { amount: true } }),
      prisma.invoice.aggregate({ where: { status: 'paid' }, _count: true, _sum: { amount: true } }),
      prisma.invoice.aggregate({ where: { status: 'pending' }, _count: true, _sum: { amount: true } }),
      prisma.invoice.aggregate({ where: { status: 'overdue' }, _count: true, _sum: { amount: true } }),
    ]);
    res.json({
      success: true,
      data: {
        totalInvoices: total._count,
        totalRevenue: total._sum.amount || 0,
        paid: { count: paid._count, amount: paid._sum.amount || 0 },
        pending: { count: pending._count, amount: pending._sum.amount || 0 },
        overdue: { count: overdue._count, amount: overdue._sum.amount || 0 },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: String(req.params.id) },
      include: { client: true },
    });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clientId, title, amount, dueDate, currency } = req.body;
    if (!clientId || !title || !amount || !dueDate)
      return res.status(400).json({ success: false, message: 'All fields are required' });
    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        title,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        dueDate: new Date(dueDate),
      },
      include: { client: true },
    });
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

export const updateInvoiceStatusById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    if (!['pending', 'paid', 'overdue'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });
    const invoice = await prisma.invoice.update({
      where: { id: String(req.params.id) },
      data: { status },
      include: { client: true },
    });
    res.json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

export const deleteInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.invoice.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    next(error);
  }
};
import express, { Request, Response } from 'express';
import { logger } from './config/logger';
import { SubmitFeedbackUseCases } from './use-cases/submitFeedbackUseCases';
import { PrismaFeedbacksRepositorie } from './repositories/prisma/prismaFeedbacksRepositorie';
import { NodemailMailAdapter } from './adapter/nodemailer/nodemailerMailAdapter';

const routes = express.Router();

routes.post('/feedbacks', async (req: Request, res: Response) => {
	const {type, comment, screenshot} = req.body;

	const prismaFeedbackRepositorie = new PrismaFeedbacksRepositorie();
	const nodemailMailAdapter = new NodemailMailAdapter();

	const submitFeedbackUseCase = new SubmitFeedbackUseCases(
		prismaFeedbackRepositorie,
		nodemailMailAdapter
	);

	await submitFeedbackUseCase.execute({
		comment,
		type,
		screenshot
	});



	logger.info('feedback created with success');

	return res.status(201).send();
});

export {routes };

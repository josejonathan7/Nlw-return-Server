import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbackRepositories } from '../feedbacksRepositories';



export class PrismaFeedbacksRepositorie implements FeedbackRepositories {


	async create ({ comment, type, screenshot }: FeedbackCreateData) {

		await prisma.feedback.create({
			data: {
				comment,
				type,
				screenshot
			}
		});
	}
}

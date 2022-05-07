import { MailAdapter } from '../adapter/mailAdapter';
import { FeedbackRepositories } from '../repositories/feedbacksRepositories';

interface SubmitFeedbackCaseRequest {
	type: string;
	comment: string;
	screenshot?: string
}

export class SubmitFeedbackUseCases {

	constructor(
		private feedbacksRepositorie: FeedbackRepositories,
		private mailAdapter: MailAdapter
	) {}

	async execute(request: SubmitFeedbackCaseRequest) {
		const { comment, type, screenshot } = request;

		if(!type) {
			throw new Error('Type is required.');
		}

		if(!comment) {
			throw new Error('Comment is required.');
		}


		if(screenshot && !screenshot.startsWith('data:image/png;base64')){
			throw new Error('Inválid screenshot format');
		}


		await this.feedbacksRepositorie.create({
			comment,
			type,
			screenshot
		});


		await this.mailAdapter.sendMail({
			subject: `Novo feedback do tipo ${type}`,
			body: [
				'<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
				`<p>Tipo do feedback ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				screenshot ? `<img source="${screenshot}" />` : '',
				'</div>'
			].join('\n')
		});
	}
}

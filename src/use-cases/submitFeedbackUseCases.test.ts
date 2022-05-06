import { SubmitFeedbackUseCases } from './submitFeedbackUseCases';


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCases(
	{ create: createFeedbackSpy  },
	{ sendMail: sendMailSpy }
);

describe('Submit feedback', () => {

	it('should be able to submit a feedback', async() => {

		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'a',
			screenshot: 'data:image/png;base64,asdasdasda'
		})).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not be able to submit feedback without type', async() => {

		await expect(submitFeedback.execute({
			type: '',
			comment: 'a',
			screenshot: 'data:image/png;base64,asdasdasda'
		})).rejects.toThrow();

	});

	it('should not be able to submit feedback without comment', async() => {

		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			screenshot: 'data:image/png;base64,asdasdasda'
		})).rejects.toThrow();

	});

	it('should not be able to submit feedback with an invalid screenshot', async() => {

		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'a',
			screenshot: 'test.jpg'
		})).rejects.toThrow();

	});
});

import { transport } from '../../config/mailTrapConfig';
import { MailAdapter, SendMailData } from '../mailAdapter';

export class NodemailMailAdapter implements MailAdapter {

	async sendMail ({ body, subject }: SendMailData) {

		await transport.sendMail({
			from: 'Equipe Feedget <oi@feedget.com>',
			to: 'jose jonathan <josejonathan689@gmail.com>',
			subject,
			html: body
		});
	}
}

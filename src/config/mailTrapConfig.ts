import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: 'f2733ee614dc06',
		pass: '2a552d53641137'
	}
});

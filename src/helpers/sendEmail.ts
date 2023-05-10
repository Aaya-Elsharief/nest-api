import { IServiceInterface } from 'src/Interfaces/IService.interface';
import * as nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  url: string,
  subject: string,
): Promise<IServiceInterface> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'bennie.crona42@ethereal.email',
      pass: 'MV4Y61wmGV4WHhMhfh',
    },
  });

  // send mail with defined transport object
  // console.log('FileURL: ', url);

  const info = await transporter.sendMail({
    from: '<nestjs@example.com>',
    to: email,
    subject: subject,
    text: `Hello world? \n ${url}`,
    html: '<b>Hello world?</b> ' + `<a href=${url}> ${subject}</a>`,
  });
  // console.log('info: ', info);

  return { data: 'an email was sent' };
};

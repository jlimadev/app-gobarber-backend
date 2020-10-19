interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    email: string;
    name: string;
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    email: 'equipe@gobarbe.com',
    name: 'Equipe do Gobarber',
  },
} as IMailConfig;

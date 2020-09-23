import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProviders';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';
// import

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

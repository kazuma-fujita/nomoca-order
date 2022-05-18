import { Logger as AmplifyLogger } from 'aws-amplify';

export const Logger = (name?: string) =>
  new AmplifyLogger(name || '', process.env.NODE_ENV === 'production' ? 'WARN' : 'DEBUG');

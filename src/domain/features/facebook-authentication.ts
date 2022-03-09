import { AuthenticationError } from '@/domain/errors';
import { AccessToken } from '@/domain/models';

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => FacebookAuthentication.Result;
}

export namespace FacebookAuthentication {
  export interface Params {
    token: string;
  }

  export type Result = AccessToken | AuthenticationError;
}

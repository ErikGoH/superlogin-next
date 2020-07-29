import {
  Document,
  DocumentScope as NanoDocumentScope,
  ServerScope as NanoServerScope,
  IdentifiedDocument,
  MaybeRevisionedDocument
} from 'nano';
import {
  DocumentScope as CloudantDocumentScope,
  ServerScope as CloudantServerScope
} from '@cloudant/cloudant';
import { Request } from 'express';

export type ServerScope = NanoServerScope | CloudantServerScope;
export type DocumentScope<D> = NanoDocumentScope<D> | CloudantDocumentScope<D>;

export interface IdentifiedObj {
  name: string;
  type: string;
}

export interface CouchDbAuthDoc
  extends IdentifiedDocument,
    MaybeRevisionedDocument,
    IdentifiedObj {
  user_id: string;
  password?: string;
  expires: number;
  roles: string[];
  provider: string;
  password_scheme?: string;
  iterations?: number;
  derived_key?: string;
  salt?: string;
}

export interface HashResult {
  salt?: string;
  derived_key?: string;
}

export interface LocalHashObj extends HashResult {
  failedLoginAttempts?: number;
  iterations?: number;
  lockedUntil?: number;
}

export interface SignUpObj {
  provider: string;
  timestamp: string;
}

export interface PersonalDBCollection {
  [dbName: string]: IdentifiedObj;
}

export interface TimeRestricted {
  issued: number;
  expires: number;
}

export interface SessionObj extends TimeRestricted {
  provider: string;
}

export interface SessionCollection {
  [session: string]: SessionObj;
}

export interface UserActivity {
  timestamp: string;
  action: string;
  provider: string;
}

export interface PasswortResetEntry extends TimeRestricted {
  token: string;
}

export interface SlUserDoc extends Document, IdentifiedObj {
  user_uid: string;
  roles: string[];
  providers: string[];
  local: LocalHashObj;
  activity?: UserActivity[];
  forgotPassword?: PasswortResetEntry;
  unverifiedEmail?: { email: string; token: string };
  signUp: SignUpObj;
  personalDBs: PersonalDBCollection;
  email: string;
  session: SessionCollection;
  profile: any;
}

export interface SlUserNew extends SlUserDoc {
  password?: string;
  confirmPassword?: string;
}

export interface SlRefreshSession extends TimeRestricted {
  provider: string;
  roles: string[];
  token: string;
  user_id: string;
}

export interface SlLoginSession extends SlRefreshSession {
  password: string;
  userDBs: { [db: string]: string };
  profile?: string;
  user_uid?: string;
  name?: string;
}

export interface SlUser {
  provider?: string;
  _id?: string;
  key?: string;
  roles?: string[];
  user_id?: string;
}

export interface SlRequest extends Request {
  user: SlUser;
}

import { AuthenticationImmutableStateType } from '../../features/authentication/models/AuthenticationModel';
import { PROBLEM_CODE } from 'apisauce';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { Action } from 'redux';

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

export type RootStateType = {
  authentication: AuthenticationImmutableStateType;
};

export type HasIDType = {
  id: string;
};

export type PageableStateType<F = any> = {
  listIds: Array<string>;
  filters?: F;
  page: number;
  last: boolean;
  totalElements?: number;
  size?: number;
  sorts?: Array<SortType>;
};

export type GravityType = 'ERROR' | 'WARNING' | 'SUCCESS' | 'INFO';

export type GrantStatusType = 'PENDING' | 'GRANTED' | 'UNAUTHORIZED';

export interface ModelEditable {
  edited?: boolean;
}

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export interface ApiErrorResponse<T> {
  ok: false;
  problem: PROBLEM_CODE;
  originalError: AxiosError;
  data?: T;
  status?: number;
  headers?: {
    authorization?: string;
    location?: string;
  };
  config?: AxiosRequestConfig;
  duration?: number;
}
export interface ApiOkResponse<T> {
  ok: true;
  problem: null;
  originalError: null;
  data?: T;
  status?: number;
  headers?: {
    authorization?: string;
    location?: string;
  };
  config?: AxiosRequestConfig;
  duration?: number;
}

type ApiError = {
  message?: string;
  detailedMessage?: string;
  errorCode?: string;
};

export type ApiResponseType<T> =
  | ApiErrorResponse<T & ApiError>
  | ApiOkResponse<T & ApiError>;

// Pageable Api Type
export type PageableApiType<T> = {
  content: Array<T>;
  last: boolean;
};

// Paginable Array Type
export type PaginableArrayType<T, F = any> = {
  data: Array<T>; // Array of result
  page: number; // Number of Page
  last: boolean; // If it's last page
  filters?: F;
};

// Fetch Pageable Type
export type FetchPageableType = {
  page: number;
  size: number;
};

// Sort Type
export type SortType = {
  sortDirection: 'ascend' | 'descend'; // The direction of sort
  sortCol: string; // The Col
};

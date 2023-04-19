import { ImmutableObject } from 'seamless-immutable';
import { ApiResponseType } from '../../../common/models/index.d';

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

/**
 * Casino State Type
 */
type CasinosStateType = {
  list: Array<DataApiDefinitions.CasinoInfosDto>;
};

export type ICasinosImmutableStateType = ImmutableObject<CasinosStateType>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type CasinosServiceType = {
  fetchCasinoDetails: (
    id: string
  ) => Promise<ApiResponseType<DataApiDefinitions.CasinoInfosDto>>;
  fetchCasinoImage: (id: string) => any;
};

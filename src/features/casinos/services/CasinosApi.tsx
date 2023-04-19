// a library to wrap and simplify api calls
import { ApiResponseType } from '../../../common/models/index.d';
import { api } from '../../../services/Api';
import CasinosConstants from '../constants/CasinosConstants';

// our "constructor"
const create = () => {
  const fetchCasinoDetails = (
    id: string
  ): Promise<ApiResponseType<DataApiDefinitions.CasinoInfosDto>> =>
    api.get(`${CasinosConstants.FETCH_CASINO_DETAILS}/${id}`);

  const fetchCasinoImage = (
    id: string
  ): Promise<ApiResponseType<DataApiDefinitions.CasinoInfosDto>> =>
    api.get(`${CasinosConstants.FETCH_CASINO_IMAGES}/${id}`);

  return {
    fetchCasinoImage,
    fetchCasinoDetails
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};

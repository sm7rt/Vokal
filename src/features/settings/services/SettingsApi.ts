// a library to wrap and simplify api calls
import SettingsConstants from '../constants/SettingsConstants';
import { api } from '../../../services/Api';
import { ApiResponseType } from '../../../common/models/index.d';

// our "constructor"
const create = () => {
  /**
   * Update Casino
   * @param data : Datas to persist
   */
  const updateCasino = (
    casinoId: string,
    data: DataApiDefinitions.CasinoUpdateDTO
  ): Promise<ApiResponseType<any>> =>
    api.put(`${SettingsConstants.UPDATE_CASINO_SERVICE}/${casinoId}`, {
      ...data
    });

  /**
   * Upload Logo Method
   * @param customerId : Id of customer
   * @param data : Logo to upload
   */
  const uploadCasinoLogo = (
    casinoId: string,
    data: any
  ): Promise<ApiResponseType<any>> =>
    api.post(`${SettingsConstants.UPLOAD_LOGO}/${casinoId}`, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data;'
      }
    });

  return {
    // a list of the API functions from step 2
    updateCasino,
    uploadCasinoLogo
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};

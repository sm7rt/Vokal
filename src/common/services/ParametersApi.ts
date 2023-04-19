// Api
import { api } from '../../services/Api';

// Type ApiService
export type ApiServiceType = {
  fetchCountries: (search: string, page: number) => {};
  fetchCities: (codePays: string, search: string, page: number) => {};
};

// Default Size Pagination
const size = 20;
// Datas Service
const DATAS_SERVICE = '/datas/api';
// Cities service
const CITIES_SERVICE = `/cities/search/paginate?size=${size}`;
// Country service
const COUNTRIES_SERVICE = `/countries/search/paginate?size=${size}`;

const create = () => {
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const fetchCountries = (search: string, page: number) =>
    api.get(
      `${DATAS_SERVICE}${COUNTRIES_SERVICE}&query=${search}&page=${page}`
    );

  /**
   * Fetch Cities Method
   * @param codePays
   * @param search
   * @param page
   */
  const fetchCities = (codePays: string, search: string, page: number) =>
    api.get(
      `${DATAS_SERVICE}${CITIES_SERVICE}&codePays=${codePays}&query=${search}&page=${page}`
    );

  // let's return back our create method as the default.
  return {
    // a list of the API functions from step 2
    fetchCountries,
    fetchCities
  };
};

// Export Default
export default {
  create
};

import MockCountries from './mock/MockCountries';
import MockCities from './mock/MockCities';

// Default Size Pagination
//const size = 20;

/* eslint-disable */
// Export Default
export default {
  /**
   * Fetch Countries Mock Service
   */
  fetchCountries: (search: string, page: number) => {
    return {
      status: 200,
      data: {
        content: MockCountries,
        last: false
      }
    };
  },

  /**
   * Fetch Cities Mock Service
   */
  fetchCities: (codePays: string, search: string, page: number) => ({
    status: 200,
    data: {
      content: MockCities,
      last: false
    }
  })
};
/* eslint-enable */

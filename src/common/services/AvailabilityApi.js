import { api as ApiAvailability } from '../../services/ApiAvailability';

const create = () => {
  const fetchAvailability = () => ApiAvailability.get('/api/get-conf');
  const fetchServiceVersion = () => ApiAvailability.get('/api/version');

  return {
    fetchAvailability,
    fetchServiceVersion
  };
};

// let's return back our create method as the default.
export default {
  create
};

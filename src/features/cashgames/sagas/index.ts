import interestListSagas from '../sub-domains/interest-list/sagas';
import runningCashGamesSagas from '../sub-domains/running-games/sagas';

/* ------------- Sagas ------------- */

// List of Sagas Handler
const cashGamesSagas = [...interestListSagas, ...runningCashGamesSagas];

// Export Default
export default cashGamesSagas;

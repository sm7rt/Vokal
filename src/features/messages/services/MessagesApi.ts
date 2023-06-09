// a library to wrap and simplify api calls
import ServicePath from './MessageServicePath';
import { api } from '../../../services/Api';

// our "constructor"
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

  /**
   * Fetch Game MEssages List with CashGame Id
   * @param {*} interestListId
   */
  const fetchMessagesList = (
    entityId: string,
    entityType: string,
    page: number,
    size: number
  ) =>
    api.get(
      `${ServicePath.GET_MESSAGE_LIST.replace(
        '{entityType}',
        entityType
      ).replace('{entityId}', entityId)}`,
      {
        page,
        size
      }
    );

  /**
   * Add a New Message
   * @param data
   */
  const addMessage = (data: any) => api.post(ServicePath.ADD_MESSAGE, data);

  /**
   * Fetch Message Details with it's Id
   * @param {*} messageId
   */
  const fetchMessageDetails = (messageId: string) =>
    api.get(
      `${ServicePath.FETCH_MESSAGE_DETAILS.replace('{messageId}', messageId)}`
    );

  // ------
  // STEP 3
  // ------
  //

  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    fetchMessagesList,
    addMessage,
    fetchMessageDetails
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};

// a library to wrap and simplify api calls
import EventServicePath from './EventsServicePath';
import { ApiResponseType } from '../../../common/models/index.d';
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
   * Fetch Running Events Method
   * @param {*} casinoId : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchRunningEvents = (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ): Promise<ApiResponseType<GamesApiDefinitions.PageFestivalDocument_>> =>
    api.get(EventServicePath(casinoId, '').FETCH_RUNNING_FESTIVALS, {
      page,
      size,
      ...filters
    });

  /**
   * Fetch Finished Events Method
   * @param {*} casinoId : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchFinishedEvents = (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ): Promise<ApiResponseType<GamesApiDefinitions.PageFestivalDocument_>> =>
    api.get(EventServicePath(casinoId, '').FETCH_FINISHED_FESTIVALS, {
      page,
      size,
      ...filters
    });

  /**
   * Fetch Event Detail with EventId
   * @param {*} festivalId
   */
  const fetchEventDetails = (festivalId: string) =>
    api.get(`${EventServicePath('', festivalId).GET_FESTIVAL_DETAILS}`);

  /**
   * Fetch Event Banner with EventId
   * @param {*} festivalId
   */
  const fetchEventBanner = (festivalId: string) =>
    api.get(`${EventServicePath('', festivalId).GET_FESTIVAL_BANNER}`);

  /**
   * Fetch Event Tournament number with EventId
   * @param {*} festivalId
   */
  const fetchEventTourNumber = (festivalId: string) =>
    api.get(
      `${EventServicePath('', festivalId).GET_FESTIVAL_TOURNAMENT_COUNT}`
    );

  /**
   * Create a new festival
   * @param {*} casinoId The casino Id
   * @param {*} formData The formData for newly festival
   */
  const createNewEvent = (casinoId: string, formData: Object) =>
    api.post(`${EventServicePath(casinoId, '').CREATE_FESTIVAL}`, formData);

  /**
   * Edit an existing festival
   * @param {*} festivalId
   */
  const editEvent = (festivalId: string, formData: Object) =>
    api.put(`${EventServicePath('', festivalId).EDIT_FESTIVAL}`, formData);

  /**
   * Delete festival by festivalId
   * @param {*} festivalId
   */
  const deleteEvent = (festivalId: string) =>
    api.delete(`${EventServicePath('', festivalId).DELETE_FESTIVAL}`);

  /**
   * Upload the Banner associated to festival
   * @param {*} casinoId The casino Id
   * @param {*} festivalId The festival Id
   * @param {*} imageData The Image Data
   */
  const uploadBannerEvent = (festivalId: string, imageData: Object) =>
    api.post(
      `${EventServicePath('', festivalId).UPLOAD_BANNER_FESTIVAL}`,
      imageData,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data'
        }
      }
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
    fetchRunningEvents,
    fetchFinishedEvents,
    fetchEventDetails,
    fetchEventBanner,
    fetchEventTourNumber,
    createNewEvent,
    editEvent,
    deleteEvent,
    uploadBannerEvent
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};

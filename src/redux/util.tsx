/**
 * Generate 4 request : Request, SuccessResponse, FailureResponse, CancelResponse
 * @param actionName
 * @param paramRequest
 * @param paramSuccessResponse
 * @param paramFailureResponse
 */
export const generateFetchAction = (
  actionName: string,
  paramRequest: Array<string>,
  paramSuccessResponse: Array<string>,
  paramFailureResponse: Array<string> = ['payload'],
  paramCancelResponse: Array<string> = []
) => {
  return {
    [`${actionName}Request`]: paramRequest,
    [`${actionName}SuccessResponse`]: paramSuccessResponse,
    [`${actionName}FailureResponse`]: paramFailureResponse,
    [`${actionName}CancelResponse`]: ['']
  };
};

/**
 * Generate Pageable Action
 * @param actionName
 */
export const generateFetchPageableAction = (
  actionName: string,
  additionalParametersRequest: Array<string> = [],
  additionalParametersResponse: Array<string> = []
) => {
  return generateFetchAction(
    actionName,
    [...additionalParametersRequest, 'filters', 'page', 'size', 'sorts'],
    [
      ...additionalParametersResponse,
      'data',
      'filters',
      'page',
      'last',
      'totalElements',
      'size',
      'sorts'
    ]
  );
};

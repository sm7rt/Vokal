import { generateFetchAction, generateFetchPageableAction } from '../util';

test('Generate Fetch Action', () => {
  const actionName = 'fetchTests';
  const paramsRequest = ['param1'];
  const paramsResponse = ['param2'];

  const result = generateFetchAction(actionName, paramsRequest, paramsResponse);

  expect(result.fetchTestsRequest).toBeDefined();
  expect(result.fetchTestsRequest.length).toEqual(1);
  expect(result.fetchTestsSuccessResponse).toBeDefined();
  expect(result.fetchTestsSuccessResponse.length).toEqual(1);
  expect(result.fetchTestsFailureResponse).toBeDefined();
  expect(result.fetchTestsCancelResponse).toBeDefined();
});

test('Generate Pageable Action', () => {
  const actionName = 'fetchPages';
  const paramsRequest = ['filters', 'page', 'size', 'sorts'];
  const paramsResponse = [
    'data',
    'filters',
    'page',
    'last',
    'totalElements',
    'size',
    'sorts'
  ];

  const result = generateFetchPageableAction(actionName);

  expect(result.fetchPagesRequest).toBeDefined();
  expect(result.fetchPagesRequest).toEqual(paramsRequest);
  expect(result.fetchPagesSuccessResponse).toBeDefined();
  expect(result.fetchPagesSuccessResponse).toEqual(paramsResponse);
  expect(result.fetchPagesFailureResponse).toBeDefined();
  expect(result.fetchPagesCancelResponse).toBeDefined();
});

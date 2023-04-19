import Actions, { reducer, INITIAL_STATE } from '../CustomersRedux';

// Success fetch customer details
test('success fetch customer details - add new customer', () => {
  const data = {
    id: 'customer4'
  };
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchCustomerDetailsSuccessResponse('customer4', data)
  );
  // They have to have the sames values
  expect(state.account).toEqual(data);
});

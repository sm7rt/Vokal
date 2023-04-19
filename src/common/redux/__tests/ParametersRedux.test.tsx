import Actions, { reducer, INITIAL_STATE } from '../ParametersRedux';

// Test on Parameters Redux
describe('ParametersRedux tests', () => {
  // Test on Success Fetch Countries
  it('success on Fetch Countries', () => {
    const data = ['france', 'espagne'];
    const page = 1;
    const last = false;
    const state = reducer(
      INITIAL_STATE,
      Actions.fetchCountrySuccessResponse(data, page, last)
    );
    // They have to have the sames values
    expect(state.countries.data).toHaveLength(2);
    expect(state.countries.page).toEqual(2);
    expect(state.countries.last).toEqual(false);
  });

  // Test on Success Fetch Cities
  it('success on Fetch Cities', () => {
    const data = ['paris', 'monaco'];
    const page = 1;
    const last = true;
    const state = reducer(
      INITIAL_STATE,
      Actions.fetchCitySuccessResponse(data, page, last)
    );
    // They have to have the sames values
    expect(state.cities.data).toHaveLength(2);
    expect(state.cities.page).toEqual(2);
    expect(state.cities.last).toEqual(true);
  });
});

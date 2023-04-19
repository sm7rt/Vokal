import { immutableComparison } from '../custom-selector';
import Immutable from 'seamless-immutable';

test('Test Simple Object with Same Attribute', () => {
  const obj1 = {
    name: 'Jean',
    pseudo: 'JeanJean'
  };

  const obj12 = {
    name: 'Jean',
    pseudo: 'JeanJean2'
  };

  // Same Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
});

test('Test Simple Object with Differents Attribute', () => {
  const obj1 = {
    name: 'Jean',
    pseudo: 'JeanJean'
  };

  const obj12 = {
    name: 'Jean',
    pseudo: 'JeanJean2',
    age: 21
  };

  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
});

test('Test Simple Object And undefined', () => {
  const obj1 = undefined;

  const obj12 = {
    name: 'Jean',
    pseudo: 'JeanJean2',
    age: 21
  };

  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
});

test('Test Simple Array', () => {
  const obj1 = [
    {
      name: 'Jean',
      pseudo: 'JeanJean'
    },
    {
      name: 'Pean',
      pseudo: 'PeanJean'
    }
  ];

  const obj12 = [
    {
      name: 'Jean',
      pseudo: 'JeanJean2',
      age: 21
    }
  ];

  // Same Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
});

test('Test Simple Array with Simple Value', () => {
  const obj1 = ['Jean', 'Pean'];

  const obj12 = ['Jean', 'CPan'];

  // Same Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
});

test('Test Simple Value', () => {
  const obj1 = 'Jean';
  const obj12 = 'Jean2';

  // Same Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
});

test('Test Complex Object with Differents Attribute', () => {
  const obj1 = {
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: {
      url: 'http://gergreg.com'
    }
  };

  const obj12 = {
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: {
      url: 'http://gergreg.com2'
    }
  };

  const obj22 = {
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: {}
  };

  // Different Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj1, obj22)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj22, obj1)).toEqual(false);
});

test('Test Immutable Object with Same Attribute', () => {
  const obj1 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean'
  });

  const obj12 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean2'
  });

  // Same Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
});

test('Test Complex Immutable Object with Differents Attribute', () => {
  const obj1 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: Immutable({
      url: 'http://gergreg.com'
    })
  });

  const obj12 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: Immutable({
      url: 'http://gergreg.com2'
    })
  });

  const obj22 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    picture: Immutable({})
  });

  // Different Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj1, obj22)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj22, obj1)).toEqual(false);
});

test('Test Complex Immutable Object with Differents Attribute', () => {
  const obj1 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    listId: Immutable(['VYeglW0BWQlfqQXBLX68'])
  });

  const obj12 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    listId: Immutable([])
  });

  const obj22 = Immutable({
    name: 'Jean',
    pseudo: 'JeanJean',
    listId: Immutable(['VYeglW0BWQlfqQXBLX68', '5464454654564'])
  });

  // Different Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj1, obj22)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj22, obj1)).toEqual(false);
});

test('Immutable Comparaison : Test Complex Immutable Object with Differents Attribute', () => {
  const obj1 = Immutable({
    filters: Immutable({
      gameOrigin: 'FLOP_USER',
      gameStates: ['PENDING', 'ACCEPTED']
    }),
    last: false,
    listId: Immutable(['VYeglW0BWQlfqQXBLX68']),
    page: 1,
    size: 30,
    sorts: Immutable([
      {
        sorCol: 'date',
        sortDirection: 'ascend'
      }
    ])
    // totalElements: 1
  });

  const obj12 = Immutable({
    filters: Immutable({
      gameOrigin: 'FLOP_USER',
      gameStates: ['PENDING', 'ACCEPTED']
    }),
    last: false,
    listId: Immutable([]),
    page: 1,
    size: 30,
    sorts: Immutable([
      {
        sorCol: 'date',
        sortDirection: 'ascend'
      }
    ])
    // totalElements: 0
  });

  const obj22 = Immutable({
    filters: Immutable({
      gameOrigin: 'FLOP_USER',
      gameStates: ['PENDING', 'ACCEPTED']
    }),
    last: false,
    listId: Immutable(['VYeglW0BWQlfqQXBLX68', '5464454654564']),
    page: 1,
    size: 30,
    sorts: Immutable([
      {
        sorCol: 'date',
        sortDirection: 'ascend'
      }
    ])
    // totalElements: 2
  });

  // Different Object
  expect(immutableComparison(obj1, obj1)).toEqual(true);
  // Different Object
  expect(immutableComparison(obj1, obj12)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj12, obj1)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj1, obj22)).toEqual(false);
  // Different Object
  expect(immutableComparison(obj22, obj1)).toEqual(false);
});

export default {
  /**
   * Mock fetch Casino Details
   */
  fetchCasinoDetails: (id: string) => ({
    status: 200,
    data: {
      id: '254654556',
      name: 'Bellagio',
      country: 'United State',
      city: 'Las Vegas',
      mailContact: 'lastvegas@gmail.com',
      telephoneNumber: '+323 3 32 32 23',
      offeredGames: [],
      position: {
        lat: 21.21,
        lon: 32.12
      }
    }
  }),

  fetchCasinoImage: (id: string) => ({
    status: 200,
    data: {
      resizedUrl: 'http://fdfgfdg.com'
    }
  })
};

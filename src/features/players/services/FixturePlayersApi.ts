// Export All Player FixtUre API
// Export Default
export default {
  // Fetch Profile
  fetchProfile: (playerId: number) => ({
    status: 200,
    data: {
      id: 1096,
      firstName: 'Jean',
      lastName: 'Cokto',
      emailAddress: 'jean.valjean@gmail.com',
      birthDate: '1989-08-14',
      city: 'Antibes',
      country: 'France',
      phoneNumber: '+33 6 00 00 00 00',
      playerName: 'jeannot'
    }
  }),

  // Fetch Profile Picture
  fetchProfilePicture: (playerId: number) => ({
    status: 200,
    data: {
      resizedUrl:
        'https://s3-eu-west-1.amazonaws.com/flop-staging/images/9cecb97/qgzjhWkBQeYGa4CEzskv/a3c619cb-57e6-4985-abc6-712b4e72a5a8.jpg'
    }
  }),

  // Search players
  searchPlayers: (search: string, size: number) => ({
    status: 200,
    data: [
      {
        id: 1096
      },
      {
        id: 1087
      }
    ]
  }),

  // Fetch Player Position
  fetchPlayerPosition: (playerId: number) => ({
    status: 200,
    data: {
      accountId: playerId,
      altitude: 0,
      id: '465654',
      position: {
        value: 3,
        metric: 'km'
      }
    }
  })
};

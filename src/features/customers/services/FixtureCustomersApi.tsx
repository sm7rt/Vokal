export default {
  /**
   * Mock fetch customers Details
   */
  fetchCustomerDetails: (id: string) => ({
    status: 200,
    data: {
      activationToken: '321',
      address: {
        city: 'Monaco',
        country: 'Monaco',
        countryCode: 'MC',
        postalCode: '98000',
        state: 'Monaco',
        streetAddress: '30 bis boulevard Princess Charlotte'
      },
      brand: 'Monaco Casino',
      brandLowerCaseIndex: 'monaco casino',
      creationDate: '2019-07-03T08:36:50.691Z',
      emailAdminUser: 'admin@casinomonaco.mc',
      emailContact: 'contact@casinomonaco.mc',
      id: 1,
      licence: '132456789',
      modificationDate: '2019-07-03T08:36:50.691Z',
      phoneNumber: '03305050505',
      referenceNumber: '321654987',
      requestState: 'MAIL_NOT_VALIDATED',
      type: 'CASINO',
      licenceAuthority: 'FRANCE'
    }
  })
};

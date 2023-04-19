// Export All Settings Fixture API
// Export Default
export default {
  // Update Casino
  updateCasino: (
    casinoId: string,
    data: DataApiDefinitions.CasinoUpdateDTO
  ) => ({
    status: 204
  }),

  uploadCustomerLogo: (customerId: number, data: any) => ({
    status: 200,
    headers: {
      location: 'http://fdskfkds/dsfsdfdsf/image1'
    }
  })
};

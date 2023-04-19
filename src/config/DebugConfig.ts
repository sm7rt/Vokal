// Export Default
/* eslint-disable */
export default {
  // Fixture Api Are used in Test Env
  useFixtures:
    (false && process.env.NODE_ENV === 'development') ||
    process.env.NODE_ENV === 'test',
  reduxLogging: process.env.NODE_ENV === 'development',
  performanceLogger: false && process.env.NODE_ENV === 'development',
  reduxActionLogger:
    (false && process.env.NODE_ENV === 'development') ||
    process.env.NODE_ENV === 'test'
};

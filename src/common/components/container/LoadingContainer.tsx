import { Spin } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../models/StateModel.d';
import { createLoadingSelector } from '../../redux/LoadingRedux';

//* ******************** */
// REDUX PROPS */
//* ******************** */
type ReduxStateProps = {
  isLoading: boolean;
};

/**
 * Loading Container HOC
 */
const LoadingContainer = (
  loadingActions: Array<string>,
  containerClassName?: string
) => (Component: any) => {
  function loadingWrapper(props: any) {
    const { isLoading, dispatch, ...rest } = props;
    return (
      <Spin
        spinning={isLoading}
        size="large"
        wrapperClassName={`w-100 ${containerClassName}`}
      >
        <Component {...rest} />
      </Spin>
    );
  }
  // Create Selector for show / hide the loader
  const loadingSelector = createLoadingSelector(loadingActions);

  //* ******************** */
  // MAP STATE TO PROPS */
  //* ******************** */
  const mapStateToProps = (state: IRootState): ReduxStateProps => ({
    isLoading: loadingSelector(state.loading)
  });

  // Return The Connected Component
  return connect(mapStateToProps)(loadingWrapper);
};

// Export Default
export default LoadingContainer;

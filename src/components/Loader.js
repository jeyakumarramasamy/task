import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import loaderSelector from '../selectors/loader';

const Loader = (props) => {
  const { isLoading } = props;
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isLoading]);
  if (!isLoading) {
    return null;
  }
  return (
    <div className="bloomkite-loader">
      <div className="fade modal-backdrop show">
      </div>
      <Spinner className="bloomkite-spinner" animation="grow" />
    </div >
  );
};

export default connect(loaderSelector)(Loader);

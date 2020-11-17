
import React, { PureComponent } from 'react';
import PropsTypes from 'prop-types';

export default class AsyncComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
    };
  }

  componentDidMount() {
    if (!this.state.Component) {
      this.setComponentState();
    }
  }

  setComponentState = () => {
    const { moduleProvider } = this.props;
    if (moduleProvider) {
      this.props.moduleProvider().then((response) => {
        const { default: Component } = response;
        this.setState({ Component });
      });
    }
  }

  render() {
    const { Component } = this.state;
    return (
      <div>
        {Component ? <Component /> : null}
      </div>
    );
  }
}

AsyncComponent.propTypes = {
  moduleProvider: PropsTypes.any,
};

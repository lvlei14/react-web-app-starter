import React, { Component } from 'react';

export default class About extends Component {
  render () {
    return (
      <div>
        <div>param: {this.props.params.id}</div>
        <div>query: {this.props.location.query.elem}</div>
      </div>
    );
  }
}

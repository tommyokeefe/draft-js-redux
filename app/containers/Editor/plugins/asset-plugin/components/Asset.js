import React from 'react';

export default class Asset extends React.Component {
  render() {
    const { block } = this.props;
    const key = block.getKey();
    const style = {
      border: '1px solid black',
      padding: 5,
      margin: '5px auto'
    };
    return (
      <div style={style}>{key}</div>
    );
  }
}
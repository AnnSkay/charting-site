import React from 'react';
import './index.css';
import 'antd/dist/antd.min.css';

export class PageTitle extends React.Component {
  render() {
    return (
      <div className="title">
        {this.props.title}
      </div>
    )
  }
}

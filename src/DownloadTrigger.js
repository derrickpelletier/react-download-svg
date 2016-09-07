import React from 'react';

const DownloadTrigger = React.createClass({
  displayName: 'DownloadTrigger',
  propTypes: {
    component: React.PropTypes.any,
    filename: React.PropTypes.string,
    eventName: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      filename: 'untitled.png',
      width: 400,
      height: 400,
      eventName: 'uiNeedsChartSvg',
      component: 'button'
    };
  },

  handleExport: function () {
    // Request a PNG with a specific size.
    ee.emit(this.props.eventName, {
      width: this.props.width,
      height: this.props.height
    });
  },

  render: function () {
    return React.createElement(this.props.component, {
      className: this.props.className,
      onClick: this.handleExport
    }, this.props.children);
  }
});

export default DownloadTrigger;

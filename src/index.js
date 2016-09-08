import ReactDOM from 'react-dom';
import React from 'react';
import EventEmitter from 'wolfy87-eventemitter';
const ee = new EventEmitter();

const Trigger = React.createClass({
  displayName: 'DownloadSvgTrigger',
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
      eventName: 'downloadSvg',
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

const Wrapper = React.createClass({
  displayName: 'DownloadSvgWrapper',
  propTypes: {
    filename: React.PropTypes.string,
    listenFor: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      width: this.props.initialWidth || '100%',
      height: this.props.initialHeight || '100%',
      downloadableOptions: null,
      creatingDownloadable: false
    };
  },

  getDefaultProps: function () {
    return {
      filename: 'untitled.png',
      listenFor: 'downloadSvg'
    }
  },

  componentDidMount: function () {
    ee.addListener(this.props.listenFor, this.startDownload);
    this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(!this.state.creatingDownloadable) return;

    // Finish creating downloadable data
    const { width, height } = this.state.downloadableOptions;
    var filename = this.state.downloadableOptions.filename;
    if(!filename) filename = this.props.filename;
    const $svg = ReactDOM.findDOMNode(this.wrapperNode).getElementsByTagName('svg')[0];
    //
    const $clone = $svg.cloneNode(true);

    $clone.style['font-family'] = '\'Helvetica Neue\', Arial, Helvetica, sans-serif';
    $clone.style['font-size'] = '14px';
    $clone.style['line-height'] = '1.4285em';

    $clone.setAttribute('width', width);
    $clone.setAttribute('height', height);

    // Reset to original size
    this.setState({
      width: prevState.width,
      height: prevState.height,
      downloadableOptions: null,
      creatingDownloadable: false,
    });

    const svgData = new XMLSerializer().serializeToString($clone);

    var canvas = document.createElement('canvas');

    // Image will be scaled to the requested size.
    // var size = data.requestedSize;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var ctx = canvas.getContext('2d');

    var img = document.createElement('img');

    // New window for the image when it's loaded
    if(!this.isChrome) window.open('', 'download');

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      // `download` attr is not well supported
      // Will result in a download popup for chrome and the
      // image opening in a new tab for others.

      var a = document.createElement('a');
      a.setAttribute('href', canvas.toDataURL('image/png'))
      a.setAttribute('target', 'download')
      a.setAttribute('download', filename);
      a.click();
    };

    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
  },

  /**
   * Expects object with:
   * width: Number
   * height: Number
   * filename: String (optional)
   */
  startDownload: function (data) {
    this.setState({
      width: data.width,
      height: data.height,
      downloadableOptions: data,
      creatingDownloadable: true
    });
  },

  render: function () {
    const { width, height } = this.state;

    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        width: width,
        height: height
      });
    });

    return (
      <div ref={(node) => this.wrapperNode = node}>
        {childrenWithProps}
      </div>
    );
  }
});

export {
	Wrapper,
	Trigger
};

# react-download-svg

Use `react-download-svg` to decorate an SVG component/element, and when triggered, will download a serialized PNG at a desired size.

## Features
- ...
------

### Example with Trigger helper

`<Wrapper>` listens to an event from `<Trigger>`, meaning you can import the trigger elsewhere in your application, no need to have them directly connected. Unique event names can be used if you need to avoid collisions.

```jsx

import {
  Wrapper,
  Trigger
} from 'react-download-svg';

const SomeComponent = React.createComponent({

  render: function () {
    return (
      <div>
        <Wrapper>
          <SomeSVGThing />
        </Wrapper>
        <div>
          <Trigger>Click to download</Trigger>
        </div>
      </div>
    );
  }
});

```

### Example with refs

To initiate a download without using the `<Trigger>`, you can hit the `startDownload()` method directly if you're using a `ref`.

```jsx

import {
  Wrapper
} from 'react-download-svg';

const SomeComponent = React.createComponent({

  handleClick: function () {
    ReactDOM.findDOMNode(this.wrapper).startDownload({
      width: 400,
      height: 400,
      filename: 'somefile.png'
    });
  },

  render: function () {
    return (
      <div>
        <Wrapper ref={n => this.wrapper = n}>
          <SomeSVGThing />
        </Wrapper>
        <div>
          <button onClick={this.handleClick}>Click to download</button>
        </div>
      </div>
    );
  }
});

```

## Props

### Wrapper

| prop | default |  |
|---|---|---|
| `filename` | String: `'untitled.png'` | Sets the filename on the downloaded file. |
| `listenFor` | String: `'downloadSvg'` | Sets the event name to listen for from the `<Trigger>`. Must be the same as set on desired `<Trigger>` instance. |

### Wrapper

| prop | default |  |
|---|---|---|
| `filename` | String: `'untitled.png'` | Sets the filename on the downloaded file. This takes priority over the filename on the `<Wrapper>` if one is set there as well. |
| `eventName` | String: `'downloadSvg'` | Sets the event name to send to `<Wrapper>`. Must be the same as set on desired `<Wrapper>` instance. |
| `width` | Number: `400` | The desired width of the png |
| `height` | Number: `400` | The desired height of the png |
| `component` | `'button'` | Defaults to a button instance, otherwise use a valid element type or a react component. |
```

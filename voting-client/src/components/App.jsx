import React from 'react/lib/React';

class App extends React.Component {
  render() {
    return this.props.children;
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;

import React from 'react/lib/React';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Winner extends React.Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
}

Winner.propTypes = {
  winner: React.PropTypes.string,
};

export default Winner;

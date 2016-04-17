import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Vote extends React.Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getPair() {
    return (this.props.pair || []);
  }
  isDisabled() {
    return !!this.props.hasVoted;
  }
  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }
  render() {
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button key={entry}
            disabled={this.isDisabled()}
            onClick={() => this.props.vote(entry)}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ? <div className="label">Voted</div> : null}
          </button>
        )}
      </div>
    );
  }
}

Vote.propTypes = {
  pair: ImmutablePropTypes.list,
  hasVoted: React.PropTypes.string,
  vote: React.PropTypes.func,
};

export default Vote;

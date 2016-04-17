import React from 'react/lib/React';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Winner from './Winner';
import Tally from './Tally';
import * as actionCreators from '../action_creators';

export class Results extends React.Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <Tally pair={this.props.pair} tally={this.props.tally} />
        <div className="management">
          <button ref="next"
            className="next"
            onClick={this.props.next}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  pair: ImmutablePropTypes.list,
  tally: ImmutablePropTypes.map,
  next: React.PropTypes.func,
  winner: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  };
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);

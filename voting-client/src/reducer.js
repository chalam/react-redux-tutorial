import { Map } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  const currentRound = state.getIn(['vote', 'round']);
  if (currentPair && currentPair.includes(entry)) {
    return state
      .set('roundVoted', currentRound)
      .set('hasVoted', entry);
  }
  return state;
}

function resetVote(state) {
  const currentRound = state.getIn(['vote', 'round']);
  const hasVoted = state.get('hasVoted');
  const roundVoted = state.get('roundVoted');
  if (hasVoted && currentRound !== roundVoted) {
    return state
      .remove('roundVoted')
      .remove('hasVoted');
  }
  return state;
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}

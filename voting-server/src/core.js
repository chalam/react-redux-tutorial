import { List, Map } from 'immutable';

export const INITIAL_STATE = new Map();

function getWinners(voteResults) {
  if (!voteResults) return [];
  const [a, b] = voteResults.get('pair');
  const aVotes = voteResults.getIn(['tally', a], 0);
  const bVotes = voteResults.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  }
  return [a, b];
}

export function setEntries(state, entries) {
  return state.set('entries', new List(entries));
}

export function vote(voteState, entry) {
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  }
  return (voteState);
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
            .remove('entries')
            .remove('round')
            .set('winner', entries.first());
  }
  let round = state.getIn(['vote', 'round'], 0);
  ++round;
  return state.merge({
    vote: new Map({
      pair: entries.take(2),
      round,
    }),
    entries: entries.skip(2),
  });
}

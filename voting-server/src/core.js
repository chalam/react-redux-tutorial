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
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
  }
  return state.merge({
    vote: new Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  });
}
import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = { errMess: null, feedbacks:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACKS:
      return {...state, errMess: null, feedbacks: action.payload};

    case ActionTypes.FEEDBACKS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        feedback.id = state.feedbacks.length;
        feedback.date = new Date().toISOString();
        return { ...state, feedbacks: state.feedbacks.concat(feedback)};

    default:
      return state;
  }
};
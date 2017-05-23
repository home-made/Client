import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    logger,
    applyMiddleware(thunk)
  );
}

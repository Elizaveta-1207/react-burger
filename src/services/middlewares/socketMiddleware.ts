import type { Middleware, MiddlewareAPI } from 'redux';
import { TWSActions, IWsActionTypes } from '../actions/orders';
import type { AppDispatch, RootState } from '../reducers';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../types';

export const socketMiddleware = (wsActions: IWsActionTypes): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => (action: TWSActions) => {
		const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsInit) socket = new WebSocket(payload);
      if (socket) {
        socket.onopen = event => dispatch({ type: onOpen, payload: event });
        socket.onerror = event => dispatch({ type: onError, payload: event });
        socket.onclose = event => dispatch({ type: onClose, payload: event });
        socket.onmessage = event => dispatch({ type: onMessage, payload: JSON.parse(event.data) });
      }
      next(action);
    };
  }) as Middleware;
};

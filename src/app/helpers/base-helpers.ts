import { subscribe } from "diagnostics_channel";
import { stat } from "fs";

export const onlyOnceClick = (
  element: HTMLElement,
  callback: (event: MouseEvent, ...args: unknown[]) => void,
  ...args: unknown[]
) => {
  element.addEventListener(
    "click",
    (event) => callback(event, ...args),
    { once: true }
  );
};

export const compose = <T>(...fns: Array<(arg: T) => T>) => (initialValue: T): T =>
  fns.reduceRight((value, fn) => fn(value), initialValue);


type callbackFn = (state: unknown) => void;
export const createStore = (initialState: unknown) => {
  let state = initialState;
  const listeners = new Set<callbackFn>();

  return {
    getState: () => state,
    setState: (newState: unknown) => {      
      state = typeof newState === 'function' ? newState(state) : newState;
      listeners.forEach(cb => cb(state));
    },
    subscribe: (callback: callbackFn) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    unsubscribe: () => false
  }
}



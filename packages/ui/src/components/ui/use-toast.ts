import * as React from "react";
import type { ToastProps } from "@radix-ui/react-toast";

export type ToastVariant = "default" | "destructive";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: ToastVariant;
};

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000;

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

type ToastState = { toasts: ToasterToast[] };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    const existing = timers.get(toastId);
    if (existing) {
      clearTimeout(existing);
      timers.delete(toastId);
    }
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
        ),
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((toast) => addToRemoveQueue(toast.id));

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined
            ? { ...toast, open: false }
            : toast
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }

      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      };
    default:
      return state;
  }
};

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

const dispatch = (action: ToastAction) => {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
};

const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 9);
};

export const toast = (
  props: Omit<ToasterToast, "id"> & { duration?: number }
) => {
  const id = createId();

  const duration = props.duration ?? 4000;

  const timer = setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  }, duration);

  timers.set(id, timer);

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
    },
  });

  return {
    id,
    dismiss: () => {
      const activeTimer = timers.get(id);
      if (activeTimer) {
        clearTimeout(activeTimer);
        timers.delete(id);
      }
      dispatch({ type: "DISMISS_TOAST", toastId: id });
    },
    update: (toastProps: Partial<ToasterToast>) =>
      dispatch({ type: "UPDATE_TOAST", toast: { ...toastProps, id } }),
  };
};

export const useToast = () => {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
};

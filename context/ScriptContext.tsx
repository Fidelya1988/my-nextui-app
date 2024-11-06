"use client"


import { createContext, useContext, useReducer, ReactNode } from 'react';
export const SET_SCRIPT ='SET_SCRIPT'
// Тип для стану користувача
interface ScriptState {
  text: string;

}

// Початковий стан
const initialScriptState: ScriptState = {
   text: ''
};

// Типи дій
type Action = 
  | { type: typeof SET_SCRIPT; payload: ScriptState }
  | { type: 'CLEAR_USER' };

// Reducer для керування станом
const userReducer = (state: ScriptState, action: Action): ScriptState => {
  switch (action.type) {
    case SET_SCRIPT:
        console.log(action)
      return { ...state, ...action.payload };
    // case 'CLEAR_USER':
    //   return { name: '', email: '' };
    default:
      return state;
  }
};

// Створюємо контекст
const ScriptContext = createContext<{
  state: ScriptState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialScriptState,
  dispatch: () => null,
});

// Провайдер для надання доступу до контексту
export const ScriptProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialScriptState);

  return (
    <ScriptContext.Provider value={{ state, dispatch }}>
      {children}
    </ScriptContext.Provider>
  );
};

// Хук для використання контексту
export const useScript = () => useContext(ScriptContext);

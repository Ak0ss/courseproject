import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext); // Az AuthContext felhasználása a currentUser érték kinyerésére

    const stateBlock = {
        chatId: "null",
        user: {}
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "change user":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, stateBlock);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};

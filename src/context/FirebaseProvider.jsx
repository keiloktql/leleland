import { createContext } from 'react';

export const Context = createContext();

const FirebaseProvider = ({ children, currentUser }) => {
    console.log(currentUser);
    return (
        <Context.Provider value={currentUser}>
            {children}
        </Context.Provider>
    );
}

export default FirebaseProvider;
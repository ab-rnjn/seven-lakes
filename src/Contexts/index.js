import { createContext } from 'react';

const applicationContext = createContext();
applicationContext.displayName = "Application";

export default applicationContext;
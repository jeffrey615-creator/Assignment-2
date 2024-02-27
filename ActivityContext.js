import React, { createContext, useContext, useState } from 'react';

const ActivitiesContext = createContext();

export function useActivities() {
  return useContext(ActivitiesContext);
}

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const updateActivities = (newActivities) => {
    setActivities(newActivities);
  };

  const addActivity = (activity) => {
    setActivities((currentActivities) => [...currentActivities, activity]);
  };

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity, updateActivities}}>
      {children}
    </ActivitiesContext.Provider>
  );
};

import React from "react";
import { MobXProviderContext } from "mobx-react";

/**
 * Hook that returns the mobX stores that were supplied to the MobX Provider component
 * @returns {object} - the mobX stores from the context
 */
const useStores = () => {
  return React.useContext(MobXProviderContext);
};

export default useStores;

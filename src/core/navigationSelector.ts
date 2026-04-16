import navigationConfig from "../config/navigationConfig";
import type { TNavigationConfig } from "../config/navigationConfig/Types";

const navigationSelector = (level: string): TNavigationConfig | undefined => {
  switch (level) {
    case "ADMIN": {
      return navigationConfig.administration;
    }
  }
  return navigationConfig.administration;
};

export default navigationSelector;

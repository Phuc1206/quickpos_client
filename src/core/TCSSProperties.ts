import * as React from "react";

type TCSSProperties = React.CSSProperties & {
  [p: string]: string | number | undefined;
};

export default TCSSProperties;

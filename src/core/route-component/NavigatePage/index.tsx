import Loading from "@/components/Loading";
import * as React from "react";
import { useNavigate } from "react-router";
export interface INavigatePageProps {
  to: string;
}

export default function NavigatePage(props: INavigatePageProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(props.to, { replace: false });
  }, [props.to, navigate]);

  return <Loading />;
}

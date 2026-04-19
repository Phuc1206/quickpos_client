import { Spinner } from "@/components/ui/spinner";
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

    return <Spinner />;
}
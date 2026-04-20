import { Spinner } from "@/components/ui/spinner";



const Loading = () => {
    return (
        <Spinner className="size-6" />
    )
};

const LoadingFullScreen = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-background">
            <Spinner className="size-12" />
        </div>
    )
};

Loading.FullScreen = LoadingFullScreen;

export default Loading;
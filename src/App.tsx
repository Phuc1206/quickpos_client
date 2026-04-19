import { QueryClientProvider } from "@/services";
import "./App.css";
import PageSelector from "@/routes";
import { BrowserRouter } from "react-router";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<QueryClientProvider>
			<BrowserRouter>
				<Toaster position="top-center" richColors />
				<PageSelector />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

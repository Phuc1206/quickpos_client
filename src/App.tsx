import { QueryClientProvider } from "@/services";
import "./App.css";
import PageSelector from "@/routes";
import { BrowserRouter } from "react-router";

function App() {
	return (
		<QueryClientProvider>
			<BrowserRouter>
				<PageSelector />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

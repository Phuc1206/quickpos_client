import { QueryClientProvider } from "@/services";
import "./App.css";
import PageSelector from "@/routes";

function App() {
	return (
		<QueryClientProvider>
			<PageSelector />
		</QueryClientProvider>
	);
}

export default App;

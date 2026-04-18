import { QueryClientProvider } from "@/services";
import "./App.css";
import LoginPage from "./pages/Login";

function App() {
	return (
		<QueryClientProvider>
			<LoginPage />
		</QueryClientProvider>
	);
}

export default App;

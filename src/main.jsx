import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Components/formulaires/AuthContext.jsx";
import { FormProvider } from "./Components/formulaires/FormContext.jsx";
import { ReservationProvider } from "./components/ReservationContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<FormProvider>
				<ReservationProvider>
					<App />
				</ReservationProvider>
			</FormProvider>
		</AuthProvider>
	</StrictMode>
);

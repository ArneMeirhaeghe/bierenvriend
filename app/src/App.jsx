import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ProductProvider from "./contexts/ProductContext";
import { MessageProvider } from "./contexts/MessageContext"; // Voeg deze import toe
import Errormessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  return (
    <ProductProvider>
      <MessageProvider>
        <ErrorBoundary>
          <Header />
          <Errormessage />
          <Authentication />
          <Footer />
        </ErrorBoundary>
      </MessageProvider>
    </ProductProvider>
  );
}

export default App;

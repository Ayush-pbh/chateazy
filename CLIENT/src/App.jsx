import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Auth from "./components/Auth/Auth";
function App() {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Chat />,
            },
            {
                path: "/auth",
                element: <Auth />,
            },
        ],
        { basename: "/" }
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

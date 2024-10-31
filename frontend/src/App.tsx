import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing.tsx";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing/>}></Route>
                <Route path={"/signin"} element={<Landing/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
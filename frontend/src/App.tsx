import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Signin from "./pages/Signin.tsx";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing/>}></Route>
                <Route path={"/signin"} element={<Signin/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
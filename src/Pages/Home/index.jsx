import Translator from "./components/Translator.jsx";
import Topbar from "./components/Topbar.jsx";

export default function HomePage() {
    return (
        <div className="w-full h-full flex flex-col ">

            <Topbar/>

            <div className="flex flex-col justify-center relative px-32">
                <Translator/>
            </div>

        </div>
    )
}
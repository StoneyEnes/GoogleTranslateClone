import {useState} from "react";
import Languages from "../../../Languages.json";
import {useDispatch, useSelector} from "react-redux";
import {setLang} from "../../../Redux/Slicer/Language.jsx";
import axios from "axios";

export default function Translator() {
    const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('en');
    const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('tr');
    const [modalOpen, setModalOpen] = useState(false);
    const [isSourceModal, setIsSourceModal] = useState(true);
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const selLang = useSelector((state) => state.language.selectedLanguage);
    const dispatch = useDispatch();

    const handleSourceLanguageSelect = (language) => {
        setSelectedSourceLanguage(language.code);
        dispatch(setLang(language.code));
    };

    const handleTargetLanguageSelect = (language) => {
        setSelectedTargetLanguage(language.code);
    };

    const toggleModal = (isSource) => {
        setIsSourceModal(isSource);
        setModalOpen(!modalOpen);
    };

    const handleLanguageSelect = (language) => {
        if (isSourceModal) {
            handleSourceLanguageSelect(language);
        } else {
            handleTargetLanguageSelect(language);
        }
        toggleModal();
    };

    function submitTranslate() {

        axios.post('https://be5a-178-245-80-150.ngrok-free.app/translate', {
            q: text,
            source: selectedSourceLanguage,
            target: selectedTargetLanguage
        })
            .then(function (response) {
                setTranslatedText(response.data.translatedText)
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className="h-[20rem] w-full pt-32 grid grid-cols-2 gap-x-4">
            <div className="w-full h-full rounded-lg border border-gray-300 relative">
                <div className="absolute transform -translate-y-[2rem] translate-x-4 w-full gap-x-4 flex">
                    <button
                        className={`font-semibold pb-2 ${
                            selectedSourceLanguage === selectedSourceLanguage
                                ? "border-b-2 border-[#1a73e8] text-[#1a73e8]"
                                : "border-b-2 border-transparent text-gray-600"
                        }`}
                        onClick={() => toggleModal(true)}
                    >
                        {Languages.find(lang => lang.code === selectedSourceLanguage).name}
                    </button>
                    <button
                        onClick={() => toggleModal(true)}
                        className="ml-4 font-semibold border-b-2 border-transparent text-gray-600 pb-2"
                    >
                        Değiştir
                    </button>
                </div>
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full p-5 text-2xl focus:border-none focus:outline-none resize-none"
                ></textarea>
            </div>
            <div className="w-full h-full rounded-lg bg-[#f5f5f5] font-semibold p-5">
                <div className="flex justify-between items-center mb-2 relative">

                    <div className="absolute transform -translate-y-[3.2rem]  gap-x-4">
                        <button
                            className={`font-semibold pb-2 ${
                                selectedTargetLanguage === selectedTargetLanguage
                                    ? "border-b-2 border-[#1a73e8] text-[#1a73e8]"
                                    : "border-b-2 border-transparent text-gray-600"
                            }`}
                            onClick={() => toggleModal(false)}
                        >
                            {Languages.find(lang => lang.code === selectedTargetLanguage).name}
                        </button>
                        <button
                            onClick={() => toggleModal(false)}
                            className="ml-4 font-semibold border-b-2 border-transparent text-gray-600 pb-2"
                        >
                            Değiştir
                        </button>
                    </div>

                    <h2 className="text-[#5f6368] text-2xl">
                        {
                            translatedText ? translatedText : "Çeviri"
                        }
                    </h2>

                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white p-5 rounded-lg max-w-md w-full sm:max-w-lg md:max-w-2xl">
                        <h2 className="text-xl mb-4">Diller</h2>
                        <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
                            {Languages.map((language, key) => (
                                <button
                                    key={key}
                                    className={`font-semibold border-b-2 border-transparent text-gray-600 pb-2 w-full text-left ${
                                        (isSourceModal && language.code === selectedTargetLanguage) ||
                                        (!isSourceModal && language.code === selectedSourceLanguage)
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (isSourceModal && language.code === selectedTargetLanguage) return;
                                        if (!isSourceModal && language.code === selectedSourceLanguage) return;
                                        handleLanguageSelect(language);
                                    }}
                                    disabled={
                                        (isSourceModal && language.code === selectedTargetLanguage) ||
                                        (!isSourceModal && language.code === selectedSourceLanguage)
                                    }
                                >
                                    {language.name}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={toggleModal}
                            className="mt-4 bg-[#1a73e8] text-white py-2 px-4 rounded"
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}

            <button onClick={() => submitTranslate()}
                    className="w-32 h-10 rounded bg-[#1a73e8] mt-10 text-white text-xl">
                Çevir
            </button>

        </div>
    );
}

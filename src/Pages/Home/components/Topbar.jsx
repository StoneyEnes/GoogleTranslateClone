import Logo from '../../../assets/logo.svg';

export default function Topbar() {
    return (
        <div className="w-full h-16 border-b px-16 border-gray-300 flex flex-row justify-between items-center">


            <div className="flex gap-x-2 items-center justify-center">
                <img src={Logo} alt=""/>
                <h2 className="text-[#61656a] text-xl mb-[0.3rem]">Çeviri</h2>
            </div>


            <img className="w-[2rem] h-[2rem] rounded-full"
                 src="https://lh3.googleusercontent.com/a/ACg8ocJNGiqT6Uc3FuqigM5POE5bne09T_4xI5jaHqPviDq_1zLyKxqc=s360-c-no"
                 alt=""/>

        </div>
    )
}
import Image from "next/image";

export default function Login() {
    return (
        <div className="flex items-center mt-10 m-auto h-auto w-3/5 bg-[#FFFFF6] rounded-xl">
            <Image src="/images/loginimage.jpg" alt="image" width={350} height={400} className="rounded-xl" />
            <div className="flex justify-center ml-10 mr-10 w-fit gap-5 ">
                <form id="login-form" className="w-fit">
                    <h1 className="font-montserrat font-bold text-3xl w-fit">Log in to BadmintonGear</h1>
                    <p className="font-montserrat text-xs mt-3 w-fit">Welcome back! Please enter your details.</p>
                    <input id="email" type="text" placeholder="Email or Phone Number" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                    <input id="password" type="password" placeholder="Password" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                    <div className="flex items-center mt-10 w-4/5 relative">
                        <button type="submit" className="pl-10 pr-10 pt-2 pb-2 rounded-xs bg-[#FF8200] text-white font-montserrat">Log in</button>
                        <a className="absolute right-0 text-[#ff8200] text-xs">Forget Password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

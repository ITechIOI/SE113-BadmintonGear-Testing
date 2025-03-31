import Image from "next/image"
export default function Register() {
    return (
        <div className="flex items-center mt-10 m-auto h-auto w-3/5 bg-[#FFFFF6] rounded-xl">
            <Image src="/images/loginimage.jpg" alt="image" width={350} height={400} className="rounded-xl" />
            <div className="ml-10 mr-10 w-fit gap-5 ">
                <form id="register-form" className="w-fit">
                    <h1 className="font-montserrat font-bold text-3xl w-fit">Create an account</h1>
                    <p className="font-montserrat text-xs mt-3 w-fit">Enter your account info below</p>
                    <input id="name" type="text" placeholder="Name" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                    <input id="email" type="text" placeholder="Email or Phone Number" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                    <input id="password" type="password" placeholder="Password" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                    <button type="submit" className="pl-10 pr-10 pt-2 pb-2 w-4/5 mt-10 rounded-xs bg-[#FF8200] text-white font-montserrat">Create Account</button>
                    <button className="pl-10 pr-10 pt-2 pb-2 w-4/5 rounded-xs mt-5 border border-gray-400 font-montserrat flex items-center justify-center">
                        <Image src="/icons/googleic.png" alt="google" width={25} height={25} className="mr-6" />
                        Sign Up With Google
                    </button>
                </form>
                <div className="text-center mt-10 w-3/4">Already have account?
                    <a href="/login" className="text-[#ff8200] font-bold ml-2">Login</a>
                </div>
            </div>
        </div>
    )
}

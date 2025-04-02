import Image from "next/image"
export default function page() {
    return (
        <div className="font-poppins">
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/about">Contact</a>
            </div>
            <div className="flex  items-stretch h-full justify-center mt-10 ml-30 mr-30">
                <div className="bg-white justify-center mr-10 p-5 w-1/3 rounded-md">
                    <div className="flex items-center mt-7 ml-5 mr-15 mb-5">
                        <Image src="/icons/callic.png" alt="call" width={40} height={40} className="mr-5" />
                        <p className="font-semibold text-xl">Call To Us</p>
                    </div>
                    <p className="mb-4">We are available 24/7, 7 days a week.</p>
                    <p>Phone: 0123456789</p>

                    <div className="border-b-2 border-gray-300 w-full h-fit mt-10 mb-10" />

                    <div className="flex items-center  ml-5 mr-15 mb-5">
                        <Image src="/icons/emailic.png" alt="call" width={40} height={40} className="mr-5" />
                        <p className="font-semibold text-xl">Write To Us</p>
                    </div>
                    <p className="mb-4">Fill out our form and we will contact you within 24 hours.</p>
                    <p className="mb-4">Emails: customer@exclusive.com</p>
                    <p>Emails: support@exclusive.com</p>
                </div>
                <div className="w-full bg-white p-10 rounded-md h-full">
                    <div className="flex justify-between gap-2 w-full h-fit">
                        <input type="text" placeholder="Your Name *" className="bg-gray-100 p-3 rounded-md" required />
                        <input type="text" placeholder="Your Email *" className="bg-gray-100 p-3 rounded-md" required />
                        <input type="text" placeholder="Your Phone *" className="bg-gray-100 p-3 rounded-md" required />
                    </div>
                    <textarea type="text" placeholder="Your Message" className="w-full mt-5 bg-gray-100 p-3 rounded-md" rows={10} required />
                    <div className="flex justify-end mt-5">
                        <button className="bg-[#FF8200] text-white p-3 rounded-md">Send Message</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

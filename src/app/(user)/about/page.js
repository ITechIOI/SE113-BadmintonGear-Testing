import Image from "next/image";
export default function About() {
    return (
        <div className="font-poppins">
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/about">About</a>
            </div>
            <div className="flex items-center justify-center mt-10 ml-30 mr-30">
                <div className="mr-15">
                    <h1 className="text-4xl font-semibold">Our story</h1>
                    <p className="mt-10">BadmintonGear is a leading online shopping platform specializing in high-quality badminton equipment, designed to meet the needs of players at all levels, from beginners to professional athletes. With a diverse catalog of over 1,000 products from top-tier brands such as Yonex, Lining, Victor, and Apacs, SmashGear ensures that customers can find the perfect rackets, shoes, apparel, and accessories to enhance their performance on the court. The platform is built on a foundation of secure payment systems, fast and reliable delivery services, and a dedicated customer support team, ensuring a seamless shopping experience. Whether you are looking for the latest professional-grade gear or affordable options for casual play, SmashGear is the ultimate destination for every badminton enthusiast.</p>
                </div>
                <Image src="/images/aboutimage.jpg" alt="image" width={350} height={400} />
            </div>
            <div className="mt-10 ml-30 mr-30 gap-auto flex items-center justify-center">
                <div id="item" className="border-2 border-gray-300 w-1/5 aspect-square p-5 flex flex-col items-center justify-center rounded-sm gap-4 hover:bg-[#FF8200] hover:text-white cursor-pointer">
                    <Image src="/icons/productsaleic.png" alt="image" width={70} height={70} className="mt-5" />
                    <p className="font-bold text-2xl">1000</p>
                    <p className="text-center">Monthly Product Sale</p>
                </div>
                <div id="item" className="border-2 border-gray-300 ml-15 w-1/5 aspect-square p-5 flex flex-col items-center justify-center rounded-sm gap-4 hover:bg-[#FF8200] hover:text-white cursor-pointer">
                    <Image src="/icons/customeric.png" alt="image" width={70} height={70} className="mt-5" />
                    <p className="font-bold text-2xl">2000</p>
                    <p className="text-center">Customer active in our site</p>
                </div>
                <div id="item" className="border-2 border-gray-300 ml-15 w-1/5 aspect-square p-5 flex flex-col items-center justify-center rounded-sm gap-4 hover:bg-[#FF8200] hover:text-white cursor-pointer">
                    <Image src="/icons/revenueic.png" alt="image" width={70} height={70} className="mt-5" />
                    <p className="font-bold text-2xl">3000</p>
                    <p className="text-center">Anual gross sale in our site</p>
                </div>
            </div>
            <div className="mt-10 ml-30 mr-30 gap-auto flex items-center justify-center">
                <div id="item" className="w-1/3 p-5 flex flex-col items-center justify-center rounded-sm gap-4 ">
                    <Image src="/icons/deliveryic.png" alt="image" width={70} height={70} className="mt-5" />
                    <p className="font-bold text-2xl">FREE AND FAST DELIVERY</p>
                    <p className="text-center">Free delivery for all orders over $140</p>
                </div>
                <div id="item" className=" w-1/3 p-5 flex flex-col items-center justify-center rounded-sm gap-4 ">
                    <Image src="/icons/customerserviceic.png" alt="image" width={70} height={70} className="mt-5" />
                    <p className="font-bold text-xl">24/7 CUSTOMER SERVICE</p>
                    <p className="text-center">Friendly 24/7 customer support</p>
                </div>
            </div>
        </div>
    )
}

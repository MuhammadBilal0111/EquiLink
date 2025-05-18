import { Link } from "react-router";

const Footer = ()=>{
    return (
        <div className="bg-black m-0 min-h-[25rem] flex justify-around w-[95vw]">

            {/* left side */}
            <div className="flex flex-col justify-center ml-10 w-[50%] gap-8">
                <div><img src="FullLogo.png" alt="" /></div>
                <div className="text-[#cccccc] w-[50%] text-sm">Equilink is a revolutionary crowdfunding platform designed for e-commerce startups.</div>
                <div className="text-white">equilink.com</div>
            </div>


            {/* right side  */}
            <div className="flex justify-end gap-20 font-poppins text-sm items-center w-[50%] text-white mr-20">
                <div className="flex flex-col gap-3">
                    <div className="mb-4">Quick links</div>
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>contact</Link>
                    <Link>FAQ</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="mb-4">Socials</div>
                    <Link>Instagram</Link>
                    <Link>X-Twitter</Link>
                    <Link>Facebook</Link>
                    <Link>LinkedIn</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
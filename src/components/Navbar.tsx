import { logo } from "@/assets";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
	const handleRedirect = () => {
		window.location.href = "https://upskillclasses.com";
	};

	return (
		<div className="flex justify-between items-center ">
			<img className="w-16 scale-[2]" src={logo} alt="" />
			<Button variant="outline" onClick={handleRedirect} size="lg" className="">
				<ArrowLeft className="w-6 h-6" />
				UpSkillClasses
			</Button>
		</div>
	);
};

export default Navbar;

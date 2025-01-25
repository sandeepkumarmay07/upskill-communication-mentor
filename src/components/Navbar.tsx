// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
	const {user, setUser} = useUser();

	const handleSignOut = () => {
		setUser(null);
	}

	return (
		<div className="flex justify-between ">
			<span className="text-xl font-extrabold">UpSkill Communication Mentor</span>
			{/* <DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<img
						className="w-12 h-12 rounded-full "
						src={user?.imageUrl}
						alt="user image"
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<SignOutButton>Sign Out</SignOutButton>
					</DropdownMenuItem>
				</DropdownMenuContent> */}
			{/* </DropdownMenu> */}
			{user && <Button onClick={handleSignOut}>Sign Out</Button>}
		</div>
	);
};

export default Navbar;

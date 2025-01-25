import { avatar2 } from "@/assets";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import Background from "./Background";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";

const UserInfoPopup = ({ onSubmit }: { onSubmit: (name: string, email: string) => void }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(name, email);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
				

				<h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
					Welcome to
					<span className="block mt-1 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
						UpSkill Classes
					</span>
				</h2>
				
				<p className="text-gray-600 mb-6">Please introduce yourself to begin your journey</p>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
							required
							placeholder="Enter your name"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
							required
							placeholder="Enter your email"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
					>
						Start Talking
					</button>
				</form>
			</div>
		</div>
	);
};

const Dashboard = () => {
	const { user, setUser } = useUser();

	const handleUserSubmit = (name: string, email: string) => {
		setUser({ name, email });
	};

	if (!user) {
		return <UserInfoPopup onSubmit={handleUserSubmit} />;
	}

	return (
		<div className="relative min-h-screen bg-white overflow-hidden">
			<Background />
			<div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-4 py-8 min-h-screen">
				<Navbar />
				<div className="mt-10 sm:mt-6">
					<p className="text-5xl pb-2 md:text-4xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800">
						Welcombe, {user.name}
					</p>
					<div className="w-full grid grid-cols-3 gap-6 mt-10 lg:grid-cols-2 md:grid-cols-1">
						<Chatbot />
						<div className="col-span-1 grid place-content-center lg:hidden">
							<img src={avatar2} className="max-w-full h-auto" alt="placeholder" />
						</div>
					</div>
				</div>
			</div>
			<footer className="absolute inset-x-0 bottom-0 md:relative md:mt-8">
				<div className="bg-gray-800 text-white text-center py-3">
					<p className="text-sm px-4">
						&copy; 2025 UpSkill Classes. Empowering individuals to communicate
						with confidence.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Dashboard;

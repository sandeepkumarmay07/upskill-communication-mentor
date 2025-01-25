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
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<Background />
			<div className="relative z-10 flex w-full max-w-7xl mx-auto px-16">
				{/* Left side content */}
				<div className="flex-1 hidden lg:flex flex-col justify-center">
					<h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
						Master Communication Skills with
						<span className="block mt-2 text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
							UpSkill Classes
						</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-xl">
						Transform your personal and professional interaction with tailored,
						interactive coaching sessions
					</p>
				</div>

				{/* Right side form */}
				<div className="lg:flex-1 w-full lg:w-auto flex items-center justify-center">
					<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full">
						<div className="inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm mb-4 bg-blue-50 border-blue-200 text-blue-900">
							<span className="relative flex h-2 w-2 mr-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
							</span>
							Get Started
						</div>

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
								Start Your Journey
							</button>
						</form>
					</div>
				</div>
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
			<div className="relative z-10 max-w-7xl mx-auto px-16 py-8 min-h-screen">
				<Navbar />
				<div className="mt-10">
					<p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800">
						Welcome, {user.name}
					</p>
					<div className="w-full grid grid-cols-3 mt-10">
						<Chatbot />
						<div className="col-span-1 grid place-content-center md:hidden ">
							<img src={avatar2} className="" alt="placeholder" />
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

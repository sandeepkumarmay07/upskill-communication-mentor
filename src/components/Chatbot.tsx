import OngoingCall from "@/components/OngoingCall";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useChatbot } from "@/hooks/useChatbot";

import { useEffect } from "react";
import CallSummary from "./CallSummary";
import { useUser } from "@/contexts/UserContext";

const Chatbot = () => {
	const { user } = useUser();

	const {
		isCallStarted,
		currentAssistant,
		assistants,
		isLoading,
		error,
		hasCallEnded,
		callDetails,
		handleCallStart,
		handleCallEnd,
		handleAssistantChange,
		handleReset,
		isStartDisabled,
	} = useChatbot();

	useEffect(() => {
		const sendMail = async () => {
			try {
				const payload = {
					message: {
						...callDetails,
						// email: user?.emailAddresses[0].emailAddress,
						email: user?.email,
					},
				};
				const response = await fetch(import.meta.env.VITE_MAKE_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (response.status === 200) {
					console.log("Sent successfully");
				}

				if (!response.ok) {
					console.error("Failed to send email");
				}
			} catch (error) {
				console.error(
					error instanceof Error ? error.message : "Failed to send email"
				);
			}
		};

		if (hasCallEnded && callDetails) {
			sendMail();
		}
	}, [hasCallEnded, callDetails, user]);

	const renderContent = () => {
		if (isCallStarted) {
			return <OngoingCall handleCallEnd={handleCallEnd} />;
		}

		if (hasCallEnded) {
			if (callDetails) {
				return (
					<CallSummary callDetails={callDetails} handleReset={handleReset} />
				);
			} else {
				return (
					<div className="text-center px-4">
						<h2 className="text-2xl md:text-xl sm:text-lg font-bold text-blue-600 mb-4">
							Evaluation in progress...
						</h2>
						<p className="text-gray-600 mb-8 md:text-sm">
							Please wait while we evaluate the call.
						</p>
					</div>
				);
			}
		}

		return (
			<div className="flex-1 flex flex-col justify-center px-4">
				<h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-blue-500 my-auto text-center">
					Select Communication Partner
				</h1>
				<Select
					value={currentAssistant?.assistantId || ""}
					onValueChange={assistantId => {
						const selectedAssistant = assistants?.find(
							a => a.assistantId === assistantId
						);
						if (selectedAssistant) {
							handleAssistantChange(selectedAssistant);
						}
					}}
				>
					<SelectTrigger className="p-6 md:p-4 sm:p-3 shadow-sm border-gray-200 hover:border-blue-400 transition-colors">
						<SelectValue placeholder="Select the voice for the assistant" />
					</SelectTrigger>
					<SelectContent>
						{assistants?.map(assistant => (
							<SelectItem
								key={assistant.assistantId}
								value={assistant.assistantId}
							>
								{assistant.assistantName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					onClick={handleCallStart}
					size="lg"
					disabled={isStartDisabled}
					className={`mt-10 md:mt-6 text-lg md:text-base w-full mb-auto ${
						isStartDisabled
							? "bg-gray-300"
							: "bg-gradient-to-r from-blue-500 to-indigo-500"
					}`}
				>
					{isLoading ? "Starting Call..." : "Start Call"}
				</Button>
			</div>
		);
	};

	return (
		<div className="col-span-2 lg:col-span-full rounded-md border-2 shadow-sm py-6 px-6 sm:px-3 flex gap-4 flex-col justify-center bg-white min-h-[400px]">
			{error && (
				<div className="bg-red-50 text-red-500 p-4 sm:p-2 rounded-md mb-4 text-sm">
					{error}
				</div>
			)}

			{renderContent()}
		</div>
	);
};

export default Chatbot;

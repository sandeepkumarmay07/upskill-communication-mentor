import React from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CallSummaryProps = {
	callDetails: {
		summary: string;
		successEvaluation: string;
	};
	handleReset: () => void;
};

const CallSummary: React.FC<CallSummaryProps> = ({
	callDetails,
	handleReset,
}) => {
	return (
		<div className="w-full">
			<p className="my-2 text-xl sm:text-lg font-bold text-blue-600">
				Call Analysis Results
			</p>
			<Tabs defaultValue="callSummary" className="w-full">
				<TabsList className="flex mb-4 w-full">
					<TabsTrigger className="flex-1 text-sm" value="callSummary">
						Call Summary
					</TabsTrigger>
					<TabsTrigger className="flex-1 text-sm" value="successEvaluation">
						Success Evaluation
					</TabsTrigger>
				</TabsList>
				<TabsContent value="callSummary">
					<div className="text-sm h-48 md:h-72  overflow-y-auto w-full rounded-md scrollbar p-4 sm:p-2 border scrollbar-hide prose-stone prose-md">
						<pre className="text-wrap bg-white text-black font-primary whitespace-pre-wrap">
							{callDetails.summary}
						</pre>
					</div>
				</TabsContent>
				<TabsContent value="successEvaluation">
					<div className="text-sm h-48 md:h-72  overflow-y-auto w-full rounded-md scrollbar p-4 sm:p-2 border scrollbar-hide prose-stone prose-md">
						<pre className="text-wrap bg-white text-black font-primary whitespace-pre-wrap">
							{callDetails.successEvaluation}
						</pre>
					</div>
				</TabsContent>
			</Tabs>

			<Button
				onClick={handleReset}
				size="lg"
				className="bg-gradient-to-r from-blue-500 to-indigo-500 mt-6 w-full sm:text-sm"
			>
				Start New Call
			</Button>
		</div>
	);
};

export default CallSummary;

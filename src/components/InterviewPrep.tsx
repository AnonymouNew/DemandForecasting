import React, { useState } from "react";
import { MessageSquare, Sparkles, HelpCircle, BookOpen, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getInterviewPrep } from "../services/geminiService";

interface InterviewPrepProps {
  topic: string;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ topic }) => {
  const [prepContent, setPrepContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generatePrep = async () => {
    setLoading(true);
    try {
      const content = await getInterviewPrep(topic);
      setPrepContent(content || "Failed to generate content.");
    } catch (error) {
      setPrepContent("Error generating interview guide. Please check your API key.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-indigo-200" />
            <h2 className="text-2xl font-bold">Interview Preparation Guide</h2>
          </div>
          <p className="text-indigo-100 max-w-2xl mb-6">
            Get AI-generated interview questions, model selection reasoning, and technical deep-dives specifically for the <strong>{topic}</strong> project.
          </p>
          <button
            onClick={generatePrep}
            disabled={loading}
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <BookOpen size={20} />}
            {prepContent ? "Regenerate Guide" : "Generate Study Guide"}
          </button>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -ml-24 -mb-24 blur-2xl" />
      </div>

      {prepContent ? (
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm prose prose-zinc max-w-none">
          <ReactMarkdown>{prepContent}</ReactMarkdown>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 flex gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
              <HelpCircle className="text-zinc-400" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-1">Technical Q&A</h4>
              <p className="text-sm text-zinc-500">Common questions about model selection, evaluation metrics, and feature engineering.</p>
            </div>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 flex gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
              <MessageSquare className="text-zinc-400" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-1">Behavioral Context</h4>
              <p className="text-sm text-zinc-500">How to explain your project's business impact and technical trade-offs to stakeholders.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

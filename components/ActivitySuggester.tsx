
import React, { useState } from 'react';
import { ActivityIdea } from '../types';
import { generateActivityIdeas } from '../services/geminiService';
import { SparklesIcon } from './icons';

export const ActivitySuggester: React.FC = () => {
    const [theme, setTheme] = useState('');
    const [ideas, setIdeas] = useState<ActivityIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!theme.trim()) {
            setError('Please enter a theme.');
            return;
        }
        setLoading(true);
        setError(null);
        setIdeas([]);
        try {
            const result = await generateActivityIdeas(theme);
            setIdeas(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center mb-4">
                <SparklesIcon className="h-8 w-8 text-pink-500 mr-3" />
                <h3 className="text-2xl font-bold text-slate-800">Activity Idea Generator</h3>
            </div>
            <p className="text-slate-500 mb-4">Stuck for ideas? Enter a theme (e.g., "Dinosaurs", "Spring", "Outer Space") and let AI create some fun activities!</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Enter a theme..."
                    className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    disabled={loading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-transform transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Generate'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6 space-y-4">
                {ideas.map((idea, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all hover:shadow-md hover:border-indigo-300">
                        <h4 className="font-bold text-lg text-indigo-700">{idea.title}</h4>
                        <p className="text-slate-600">{idea.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

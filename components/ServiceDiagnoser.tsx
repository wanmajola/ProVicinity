
import React, { useState } from 'react';
import { diagnoseIssue } from '../services/geminiService';
import { DiagnosisResult } from '../types';
import { Bot, AlertTriangle, ShieldCheck, ArrowRight, Loader2, Stethoscope } from 'lucide-react';

interface ServiceDiagnoserProps {
  availableServices: string[];
  onBookNow: (serviceName: string) => void;
}

export const ServiceDiagnoser: React.FC<ServiceDiagnoserProps> = ({ availableServices, onBookNow }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const diagnosis = await diagnoseIssue(description, availableServices);
      setResult(diagnosis);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency':
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white text-primary-600 shadow-sm text-sm font-bold uppercase tracking-wide mb-4 border border-gray-100">
              <Bot className="w-4 h-4 mr-2" /> AI Service Assistant
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Not sure what's wrong?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your problem below. Our AI will identify the likely issue, check for safety hazards, and recommend the right service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Describe the issue (e.g., "My outlet is buzzing" or "Water is cold")
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none min-h-[160px] text-gray-700 resize-none mb-4"
                placeholder="Type your problem here..."
              ></textarea>
              <button
                onClick={handleAnalyze}
                disabled={loading || !description.trim()}
                className="w-full bg-primary-900 text-white font-bold py-4 rounded-xl hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-5 h-5 mr-2" /> Diagnose Issue
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            <div className="relative">
              {result ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-lg">Analysis Result</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getUrgencyColor(result.urgency)}`}>
                      {result.urgency} Priority
                    </span>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Recommended Service</div>
                      <div className="text-2xl font-bold text-primary-600">{result.recommendedService}</div>
                      <p className="text-gray-600 mt-2 text-sm">{result.reasoning}</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start">
                      <ShieldCheck className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-orange-900 text-sm mb-1">Safety Tip</div>
                        <p className="text-orange-800 text-sm leading-relaxed">{result.safetyTip}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => onBookNow(result.recommendedService)}
                      className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      Book This Service <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
                  <Bot className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="font-medium">AI Analysis Pending</p>
                  <p className="text-sm mt-2">Describe your issue on the left to get an instant professional assessment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

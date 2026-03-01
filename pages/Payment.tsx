import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Payment: React.FC = () => {
    const { content } = useLanguage();
    // We need to safely access the paymentPage object in case it's not fully typed yet in the context
    // @ts-ignore
    // @ts-ignore
    const paymentContent = content.paymentPage;

    const location = useLocation();
    const type = location.state?.type || 'usa'; // Default to USA if no state

    // @ts-ignore
    const paymentLink = type === 'israel' ? paymentContent.externalLinkIsrael : paymentContent.externalLinkUSA;

    const [agreed, setAgreed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-purple-900/50 shadow-2xl shadow-purple-900/20 p-8 md:p-10 relative z-10">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-900/30 rounded-2xl mb-6 backdrop-blur-sm border border-purple-800/50">
                        <Lock className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{paymentContent.title}</h1>
                    <p className="text-purple-300 text-sm">{paymentContent.subtitle}</p>
                </div>

                <div className="space-y-8">
                    {/* Terms Checkbox */}
                    <div className="bg-purple-950/30 p-4 rounded-xl border border-purple-800/30 flex gap-4 items-start">
                        <div className="pt-0.5">
                            <input
                                type="checkbox"
                                id="terms-agree"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-5 h-5 rounded border-purple-400 bg-purple-900/50 text-purple-600 focus:ring-purple-500 cursor-pointer"
                            />
                        </div>
                        <label htmlFor="terms-agree" className="text-sm text-purple-100 cursor-pointer select-none">
                            {paymentContent.termsLabel}{' '}
                            <Link to="/terms" target="_blank" className="text-purple-400 font-bold hover:text-purple-300 underline underline-offset-2">
                                {paymentContent.termsLink}
                            </Link>
                        </label>
                    </div>

                    {/* Pay Button */}
                    <a
                        href={agreed ? paymentLink : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                    w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300
                    ${agreed
                                ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-600/30 transform hover:-translate-y-1'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            }
                `}
                        onClick={(e) => !agreed && e.preventDefault()}
                    >
                        <span>{paymentContent.button}</span>
                        <ExternalLink className="w-5 h-5" />
                    </a>

                    {!agreed && (
                        <p className="text-center text-xs text-slate-500">
                            * {paymentContent.subtitle}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

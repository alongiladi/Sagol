import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield } from 'lucide-react';

export const Terms: React.FC = () => {
    const { content } = useLanguage();
    const { terms } = content;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 relative">
                        <div className="inline-flex items-center justify-center p-4 bg-purple-900/30 rounded-2xl mb-6 backdrop-blur-sm border border-purple-800/50">
                            <Shield className="w-10 h-10 text-purple-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{terms.title}</h1>
                        <p className="text-purple-300">{terms.lastUpdated}</p>
                    </div>

                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-purple-900/50 overflow-hidden shadow-2xl shadow-purple-900/20">
                        {/* Content */}
                        <div className="p-8 md:p-12 text-slate-300 leading-relaxed">

                            {/* Intro Section */}
                            <div className="mb-10 bg-purple-950/50 p-6 md:p-8 rounded-2xl border border-purple-900/50">
                                <h2 className="font-bold text-lg mb-4 text-white">{terms.intro.operatedByLabel}</h2>
                                <div className="space-y-2 text-sm md:text-base text-purple-100">
                                    <p className="font-medium text-white text-lg">{terms.intro.operatedBy}</p>
                                    <p>{terms.intro.amutahId}</p>
                                    <p>{terms.intro.address}</p>
                                    <p>{terms.intro.phone}</p>
                                    <p className="text-purple-400 italic mt-4">{terms.intro.note}</p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-purple-800/50 font-medium text-purple-200">
                                    {terms.intro.agreement}
                                </div>
                            </div>

                            {/* Terms Sections */}
                            <div className="space-y-12">
                                {terms.sections.map((section, index) => (
                                    <section key={index} className="scroll-mt-24">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-sm border border-purple-600/30">
                                                {index + 1}
                                            </span>
                                            {section.title.replace(/^\d+\.\s*/, '')}
                                        </h3>
                                        <ul className="space-y-4 pr-11">
                                            {section.content.map((paragraph, pIndex) => (
                                                <li key={pIndex} className="flex gap-4 group">
                                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5 flex-shrink-0 group-hover:bg-purple-400 transition-colors" />
                                                    <span className="group-hover:text-purple-100 transition-colors">{paragraph}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

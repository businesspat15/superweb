import React from 'react';
import { FileText, Target, PieChart, Map, ShieldAlert, Award, Zap, Users, Lightbulb, Leaf } from 'lucide-react';

const WhitePaperPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 animate-fade-in-up">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gold-500/10 text-gold-500 mb-6 border border-gold-500/20">
                <FileText size={32} />
            </div>
            <h1 className="font-serif text-3xl md:text-6xl font-black text-white mb-6 leading-tight">
                CIFCI TOTO <span className="text-gold-400">WHITEPAPER</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-gold-400 font-mono">
                <span className="bg-navy-800 px-3 py-1 rounded border border-gold-500/20">Symbol: $CIFT</span>
                <span className="bg-navy-800 px-3 py-1 rounded border border-gold-500/20">Blockchain: Solana</span>
                <span className="bg-navy-800 px-3 py-1 rounded border border-gold-500/20">Launch: 2026</span>
            </div>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Project Type: Community Economy • NFT Ecosystem 
            </p>
        </div>

        {/* Document Container */}
        <div className="bg-navy-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-12 shadow-2xl space-y-8 md:space-y-12">
            
            {/* 1. Abstract */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Award className="text-gold-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">1. Abstract</h2>
                </div>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4 text-sm md:text-base">
                    <p>
                        CIFCI TOTO is a character-driven Web3 ecosystem built around the journey of <strong>CIFCI TOTO</strong>. A normal man who discovered Bitcoin early, mined patiently, and evolved from a digital builder into a real-world infrastructure visionary.
                    </p>
                    <p>
                        CIFCI TOTO introduces a <strong>Presale-First, Build-to-Participate economy</strong>, where early believers fund long-term development and are rewarded through utility, access, governance, and participation power - not unsustainable emissions.
                    </p>
                    <p>This project bridges:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gold-100">
                        <li>Early crypto values</li>
                        <li>Community ownership</li>
                        <li>Proof of Participation.</li>
                    </ul>
                </div>
            </section>

            {/* 2. The Character */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Users className="text-gold-400 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">2. The CIFCI TOTO Character</h2>
                </div>
                <div className="bg-navy-900/50 p-6 rounded-xl border border-white/5 space-y-4 text-gray-300 text-sm md:text-base">
                    <p>
                        CIFCI TOTO began as an ordinary individual. He:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Read the Bitcoin whitepaper when few cared</li>
                        <li>Mined in the early days with patience, not greed</li>
                        <li>Held through cycles instead of chasing hype</li>
                        <li>Learned that wealth without purpose is incomplete</li>
                    </ul>
                    <p className="border-l-4 border-gold-500 pl-4 italic text-gold-100">
                        His next chapter is building Community power Ecosystems, applying crypto-earned discipline to real-world systems.
                    </p>
                    <p>
                        CIFCI TOTO is the digital reflection of this journey.
                    </p>
                </div>
            </section>

            {/* 3. Overview, Mission, Vision */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Target className="text-purple-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">3. Strategic Vision</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-gold-400 text-lg">Project Overview</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            CIFCI TOTO operates on a <strong>Presale-Driven Community Model</strong>.
                            <br/><br/>
                            Tokens are distributed via structured presale rounds. Participation unlocks utility, influence, and long-term benefits. Value is created through ecosystem growth, not inflation. Early believers become early builders, not extractors.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-gold-400 text-lg">Mission</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            To create a Web3 ecosystem where:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Early supporters fund real development</li>
                                <li>Participation defines influence</li>
                                <li>Tokens represent access and ownership, not promises of yield</li>
                            </ul>
                        </p>
                    </div>
                </div>

                <div className="bg-navy-900 p-6 rounded-xl border border-gold-500/20 text-center">
                    <h3 className="font-bold text-white mb-2">VISION</h3>
                    <p className="text-gray-400 italic text-sm md:text-base">
                        To build a community-owned ecosystem that evolves from:
                        <br/>
                        <span className="text-gold-400 font-bold">crypto → Community Ecosystems </span>,
                        <br/>
                        CIFCI TOTO is proof that patience builds futures.
                    </p>
                </div>
            </section>

            {/* 4. Problem & Solution */}
            <section className="space-y-6">
                 <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Lightbulb className="text-yellow-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">4. Core Problem & Solution</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/10">
                        <h3 className="text-red-400 font-bold mb-4">Core Problem</h3>
                        <p className="text-gray-400 text-sm">
                            Presales without purpose also fail when:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 text-sm mt-2">
                            <li>Funds are misused</li>
                            <li>Utility is unclear</li>
                            <li>Communities are ignored</li>
                        </ul>
                    </div>
                    <div className="bg-green-500/5 p-6 rounded-xl border border-green-500/10">
                        <h3 className="text-green-400 font-bold mb-4">Solution: Proof of Participation</h3>
                        <p className="text-gray-400 text-sm">
                            CIFCI TOTO combines presale funding for real development with Proof of Participation for ecosystem power.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            They are earned through belief, participation, and contribution.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. Distribution & PoP */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <PieChart className="text-blue-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">5. Distribution & Participation</h2>
                </div>
                <div className="space-y-6 text-gray-300">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Token Distribution Model (Presale)</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                            
                            <li><span className="text-gold-400">Public Presale</span> – Open participation</li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">💡 Exact pricing, vesting, and caps defined transparently before launch.</p>
                    </div>
                    
                    <div>
                         <h3 className="text-lg font-bold text-white mb-2">Proof of Participation (PoP)</h3>
                         <p className="text-sm mb-2">Unlocks governance weight, NFT access, priority ecosystem features, and future revenue participation (non-guaranteed).</p>
                         <p className="text-sm">Participation is measured by:</p>
                         <div className="flex flex-wrap gap-2 mt-2">
                            {['Consistency', 'Contribution', 'Strategic involvement', 'Community actions'].map(tag => (
                                <span key={tag} className="bg-navy-900 px-3 py-1 rounded-full text-xs border border-white/10">{tag}</span>
                            ))}
                         </div>
                    </div>
                </div>
            </section>

            {/* 6. NFT & Utility */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Zap className="text-gold-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">6. NFTs & Utility</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">CIFCI TOTO NFTs</h3>
                        <p className="text-sm text-gray-400 mb-2">Represent Identity, Status, and Long-term alignment.</p>
                        <ul className="list-disc list-inside text-sm text-gray-400">
                            <li>Presale priority</li>
                            <li>Governance multipliers</li>
                            <li>Access to future energy-linked initiatives</li>
                        </ul>
                        <p className="text-xs text-gold-500 mt-2">NFTs enhance participation - not profit guarantees.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Token Utility ($CIFT)</h3>
                        <p className="text-sm text-gray-400 mb-2">$CIFT is a utility & governance token.</p>
                         <ul className="list-disc list-inside text-sm text-gray-400">
                            <li>Ecosystem access</li>
                            <li>Governance voting</li>
                            <li>NFT interactions</li>
                            <li>Infrastructure-related initiatives</li>
                            <li>Participation weighting</li>
                        </ul>
                        <p className="text-xs text-gold-500 mt-2">Holding alone does nothing. Usage creates influence.</p>
                    </div>
                </div>
            </section>

            {/* 7. Roadmap */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Map className="text-cyan-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">7. Roadmap</h2>
                </div>
                <div className="relative border-l-2 border-white/10 ml-3 space-y-12 py-4">
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <h3 className="text-lg font-bold text-white mb-2">STAGE 1 — THE DISCOVERY (Foundation Phase)</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                            <li>Inspired by CIFCI TOTO character</li>
                            <li>Finalize CIFCI TOTO narrative & ecosystem design</li>
                            <li>Launch official website & documentation</li>
                            <li>Community formation</li>
                        </ul>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-navy-800 border-2 border-gold-500"></div>
                        <h3 className="text-lg font-bold text-white mb-2">STAGE 2 — THE BUILDER (Ecosystem Phase)</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                            <li>From miner to disciplined builder</li>
                            <li>Public presale launch</li>
                            <li>NFT mint (identity & participation-based)</li>
                            <li>Participation tracking system (PoP)</li>
                            <li>Strategic partnerships onboarding</li>
                        </ul>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-navy-800 border-2 border-gray-600"></div>
                        <h3 className="text-lg font-bold text-white mb-2">STAGE 3 — THE LEGACY (Infrastructure Phase)</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                            <li>Long-term ecosystem sustainability planning</li>
                        </ul>
                    </div>
                </div>
            </section>

             {/* 8. Tokenomics Data */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <PieChart className="text-green-500 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">8. Tokenomics</h2>
                </div>
                <div className="bg-navy-900 rounded-xl p-6 border border-white/5 text-center">
                    <h3 className="text-gray-400 uppercase tracking-widest text-xs mb-2">Total Supply</h3>
                    <div className="text-2xl md:text-4xl font-mono font-bold text-gold-400 break-all">$CIFT 70,000,000,000 </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Presale & Community Distribution', value: '40%' },
                        { label: 'Ecosystem & Development Fund', value: '30%' },
                        { label: 'Marketing', value: '10%' },
                        { label: 'Liquidity', value: '10%' },
                        { label: 'Strategic Reserve', value: '10%' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-navy-800 rounded-lg border border-white/5 text-sm md:text-base">
                            <span className="text-gray-300">{item.label}</span>
                            <span className="font-bold text-gold-400">{item.value}</span>
                        </div>
                    ))}
                </div>
                
            </section>

             {/* 9. Funds & Env */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                    <Leaf className="text-green-400 shrink-0" size={28} />
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-white">9. Commitment</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <h3 className="text-lg font-bold text-white mb-2">Fund Utilization</h3>
                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                            <li>Platform & ecosystem development</li>
                            <li>Legal & compliance</li>
                            <li>Infrastructure research</li>
                            <li>Community growth</li>
                            <li>Liquidity provisioning</li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">Transparency reports will be shared periodically.</p>
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-white mb-2">Environmental Commitment</h3>
                        <p className="text-sm text-gray-400 mb-2">CIFCI TOTO is built on Solana for low energy consumption and high efficiency.</p>
                        <p className="text-sm text-gray-400">The long-term objective is direct participation in renewable energy projects, aligning digital ownership with real-world sustainability.</p>
                     </div>
                </div>
            </section>

            {/* 10. Final Statement */}
            <div className="bg-gold-500/10 p-6 md:p-8 rounded-2xl border border-gold-500/30 text-center space-y-4">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">FINAL STATEMENT</h3>
                <p className="text-base md:text-lg text-gold-100 italic">
                    "CIFCI TOTO is Believe-to-Build. Not hype-driven. Not inflation-driven. From patience to purpose."
                </p>
                <div className="flex flex-col gap-1 text-sm text-gold-400 font-bold uppercase tracking-wider">
                    <span>Proof of Participation.</span>
                    <span>Proof of Belief.</span>
                    <span>Proof of Future.</span>
                </div>
            </div>

            {/* 11. Disclaimer */}
            <section className="space-y-6 bg-navy-900/80 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => { /* Toggle expand if needed */ }}>
                    <ShieldAlert className="text-red-400 shrink-0" size={24} />
                    <h2 className="font-serif text-lg md:text-xl font-bold text-red-400">Risk Disclaimer & Legal</h2>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed text-justify space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    <p>
                        CIFCI TOTO Tycoon is a Play-to-Earn and NFT project involving crypto-assets. Tokens and NFTs may lose value. Participation does not guarantee profit. This document is informational only and does not constitute financial advice.
                    </p>
                    <p>
                        It is important that investors understand the following risk: In the future, $CIFT may lose its value in part or in full. $CIFT may not always be transferable. Technical constraints, or regulatory changes could impact. $CIFT token may become illiquid. Utility is not guaranteed. $CIFT tokens are not financial instruments, may not be exchangeable against the good or service promised in the crypto asset whitepaper. and while they offer access to staking, DAO voting, and community fun, these features are not promises of profit or services in especially in the case of a failure or discontinuation of the crypto-asset project. In the event of project failure, your $CIFT tokens may lose all value and become non-functional.
                    </p>
                    <p>
                        $CIFT is not covered under investor protection laws. This means: No coverage under Directive 97/9/EC (Investor Compensation Schemes). No protection by Directive 2014/49/EU (Deposit Guarantee Schemes).
                    </p>
                    <p>
                        No financial solicitation. This whitepaper does not constitute a financial prospectus under Regulation (EU) 2017/1129, nor is it an invitation to invest in traditional securities or instruments.
                    </p>
                    <p>
                        CIFCI TOTO and their team and its community confirm that the crypto-asset white paper complies with this Title and that, to the best of the knowledge of the management body, the information presented in the crypto-asset white paper is fair, clear and not misleading and the crypto-asset white paper makes no omission likely to affect its import. The prospective holder should base any decision to purchase $CIFT on the content of the crypto-asset white paper as a whole and not on the summary alone. Once tokens are purchased, there will be no withdrawal, refund, or reversal policy. All transactions are final. Ensure your decision is well-informed and intentional before proceeding.
                    </p>
                    <p>
                        The offer to the public of $CIFT does not constitute an offer or solicitation to purchase financial instruments and that any such offer or solicitation can be made only by means of a prospectus or other offer documents pursuant to the applicable national law. This crypto-asset white paper does not constitute a prospectus as referred to in Regulation (EU) 2017/1129 of the European Parliament and of the Council or any other offer document pursuant to Union or national law.
                    </p>
                    <p>
                        Investors should review all information thoroughly and proceed with caution. Crypto-assets carry inherent risks, including potential loss of value, market volatility, and regulatory changes. Always conduct independent research, consult with financial advisors when needed, and only invest what you can afford to lose. $CIFT is a community-driven project with a long-term vision, but no outcome is guaranteed. Stay informed, stay secure.
                    </p>
                    <p>
                        CIFCITOTO reserves the right to amend, update, or modify any section of this white paper at any time, without prior notice. By participating in the CIFCITOTO ecosystem, token holders acknowledge and agree that Any information provided within this white paper is subject to change as the project evolves. CIFCITOTO and its authorized contributors maintain the authority to make adjustments for strategic, legal, or operational reasons.
                    </p>
                    <p>
                        Informational Purposes Only. This white paper is provided for informational purposes only and does not constitute legal, financial, investment, or tax advice. Prospective token holders should consult with professional advisors before making any decision to participate in the CIFCITOTO ecosystem.
                    </p>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default WhitePaperPage;
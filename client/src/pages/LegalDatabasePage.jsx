import React, { useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp, ExternalLink, Scale } from 'lucide-react';

const legalActs = [
    {
        name: "Consumer Protection Act, 2019",
        category: "Consumer",
        sections: [
            { section: "Section 2(7)", title: "Definition of Consumer", description: "Defines who qualifies as a 'consumer' — any person who buys goods or hires services for consideration, including online transactions." },
            { section: "Section 2(11)", title: "Deficiency in Service", description: "Any fault, imperfection, shortcoming, or inadequacy in the quality, nature, and manner of performance of a service." },
            { section: "Section 35", title: "Jurisdiction of District Commission", description: "Complaints where the value of goods/services and compensation claimed does not exceed ₹1 Crore shall be filed before the District Commission." },
            { section: "Section 39", title: "Appeals", description: "Any person aggrieved by an order of the District Commission may appeal to the State Commission within 45 days." },
            { section: "Section 69", title: "Penalties", description: "Failure to comply with a Commission order may result in imprisonment of 1-3 years or a fine of ₹25,000 - ₹1,00,000." },
        ]
    },
    {
        name: "Indian Penal Code, 1860",
        category: "Criminal",
        sections: [
            { section: "Section 415", title: "Cheating", description: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property." },
            { section: "Section 420", title: "Cheating & Dishonestly Inducing Delivery of Property", description: "Punishable with imprisonment up to 7 years and fine for cheating and thereby dishonestly inducing delivery of property." },
            { section: "Section 406", title: "Criminal Breach of Trust", description: "Whoever, entrusted with property, dishonestly misappropriates or converts it to his own use." },
            { section: "Section 503", title: "Criminal Intimidation", description: "Whoever threatens another with any injury to his person, reputation or property, with intent to cause alarm." },
        ]
    },
    {
        name: "Rent Control Act",
        category: "Property",
        sections: [
            { section: "Section 4", title: "Standard Rent", description: "The court may fix standard rent having regard to provisions of law, the situation, condition, and locality of the premises." },
            { section: "Section 12", title: "Non-Eviction on Payment of Rent", description: "A landlord cannot evict a tenant so long as the tenant pays or is ready to pay the standard rent and permitted increases." },
            { section: "Section 13", title: "Grounds for Eviction", description: "Landlord can seek eviction only on specified grounds: non-payment, subletting, nuisance, or bona fide personal need." },
            { section: "Section 15", title: "Security Deposit Return", description: "Landlord must return the security deposit within the stipulated period after the tenant vacates the premises." },
        ]
    },
    {
        name: "Industrial Disputes Act, 1947",
        category: "Employment",
        sections: [
            { section: "Section 2(k)", title: "Definition of Industrial Dispute", description: "Any dispute between employers and workmen, connected with employment or non-employment or terms of employment." },
            { section: "Section 25-F", title: "Conditions for Retrenchment", description: "No workman employed for more than one year shall be retrenched without one month's written notice and compensation of 15 days' pay per year of service." },
            { section: "Section 25-G", title: "Last-Come-First-Go Principle", description: "In case of retrenchment, the employer shall follow the principle of last person hired should be the first retrenched." },
            { section: "Section 33-A", title: "Complaint for Change of Conditions", description: "A workman may file a complaint if the employer alters service conditions during a pending dispute." },
        ]
    },
    {
        name: "Information Technology Act, 2000",
        category: "Cyber",
        sections: [
            { section: "Section 43", title: "Penalty for Damage to Computer Systems", description: "Unauthorized access, data theft, or introduction of viruses — compensation up to ₹1 Crore." },
            { section: "Section 66", title: "Computer Related Offences", description: "Dishonestly or fraudulently doing any act referred to in Section 43 — imprisonment up to 3 years and/or fine up to ₹5 Lakh." },
            { section: "Section 66C", title: "Identity Theft", description: "Fraudulently using another person's electronic signature or password — imprisonment up to 3 years and fine up to ₹1 Lakh." },
            { section: "Section 67", title: "Publishing Obscene Material", description: "Publishing obscene material in electronic form — first offence imprisonment up to 3 years and fine up to ₹5 Lakh." },
        ]
    },
    {
        name: "Right to Information Act, 2005",
        category: "Governance",
        sections: [
            { section: "Section 3", title: "Right to Information", description: "All citizens shall have the right to information subject to the provisions of this Act." },
            { section: "Section 6", title: "How to File RTI", description: "Application to PIO in writing or electronic means, with prescribed fee." },
            { section: "Section 7", title: "Disposal of Request", description: "PIO must respond within 30 days (48 hours if life/liberty is involved)." },
            { section: "Section 19", title: "Appeal", description: "First appeal within 30 days to the senior officer; second appeal to Information Commission within 90 days." },
        ]
    },
];

const categoryColors = {
    Consumer: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Criminal: "text-red-400 bg-red-500/10 border-red-500/20",
    Property: "text-green-400 bg-green-500/10 border-green-500/20",
    Employment: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Cyber: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Governance: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

const LegalDatabasePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedAct, setExpandedAct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(legalActs.map(a => a.category))];

    const filteredActs = legalActs.filter(act => {
        const matchesSearch = searchQuery === "" ||
            act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.sections.some(s =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesCategory = selectedCategory === "All" || act.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    <span className="gradient-text">Indian Legal Database</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Browse key Indian legal acts and sections referenced by our AI. Searchable and categorized for quick access.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search acts, sections, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Acts List */}
            <div className="max-w-4xl mx-auto space-y-4">
                {filteredActs.map((act, i) => (
                    <div
                        key={i}
                        className="rounded-3xl glass gradient-border overflow-hidden animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <button
                            onClick={() => setExpandedAct(expandedAct === i ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <BookOpen className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-bold text-lg">{act.name}</h3>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${categoryColors[act.category]}`}>
                                        {act.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500 text-sm">{act.sections.length} sections</span>
                                {expandedAct === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                        </button>

                        {expandedAct === i && (
                            <div className="border-t border-white/[0.06] p-6 space-y-4 animate-fade-in">
                                {act.sections.map((sec, j) => (
                                    <div key={j} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-blue-400 font-bold text-sm">{sec.section}</span>
                                            <span className="text-white font-semibold text-sm">— {sec.title}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed">{sec.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {filteredActs.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm">Try a different search term or category.</p>
                    </div>
                )}
            </div>

            {/* Disclaimer */}
            <div className="text-center mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 max-w-3xl mx-auto">
                <p className="text-amber-400/80 text-sm">
                    ⚠️ <strong>Disclaimer:</strong> This database is for informational purposes only. Always consult a qualified legal professional for advice specific to your situation.
                </p>
            </div>
        </div>
    );
};

export default LegalDatabasePage;

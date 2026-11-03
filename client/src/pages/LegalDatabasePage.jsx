import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Scale, ChevronDown, ExternalLink } from 'lucide-react';
import legalDatabaseSeed, { categories as seedCategories, totalSections as seedTotalSections, totalActs as seedTotalActs } from '../data/legalDatabase';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LegalDatabasePage = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [laws, setLaws] = useState(legalDatabaseSeed);
    const [dataSource, setDataSource] = useState('seed');
    const [loading, setLoading] = useState(true);

    // Fetch laws from API on mount (fallback to seed data)
    useEffect(() => {
        const fetchLaws = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/laws`);
                if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
                    setLaws(res.data.data);
                    setDataSource(res.data.source || 'api');
                }
            } catch {
                // Silently fall back to seed data (already set as default)
            } finally {
                setLoading(false);
            }
        };
        fetchLaws();
    }, []);

    // Derive categories and counts from current data
    const categories = useMemo(() => [...new Set(laws.map(a => a.category))].sort(), [laws]);
    const totalActs = laws.length;
    const totalSections = useMemo(() => laws.reduce((sum, act) => sum + (act.sections?.length || 0), 0), [laws]);

    const filtered = useMemo(() => {
        const lower = search.toLowerCase();
        return laws.filter(act => {
            const matchCategory = selectedCategory === 'All' || act.category === selectedCategory;
            if (!matchCategory) return false;
            if (!search) return true;
            return (
                act.act.toLowerCase().includes(lower) ||
                act.category.toLowerCase().includes(lower) ||
                act.sections.some(s =>
                    s.section.toLowerCase().includes(lower) ||
                    s.title.toLowerCase().includes(lower) ||
                    s.description.toLowerCase().includes(lower)
                )
            );
        });
    }, [search, selectedCategory]);

    const filteredSections = filtered.reduce((sum, act) => sum + act.sections.length, 0);

    return (
        <div className="py-16 animate-fade-in-up">
            <div className="text-center mb-12">
                <div className="tag tag-gold mx-auto mb-4 w-fit">
                    <BookOpen className="w-3.5 h-3.5" /> Legal Reference
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4">Indian Legal Database</h1>
                <p className="text-[var(--color-ink-muted)] max-w-2xl mx-auto font-body">
                    Comprehensive reference of {totalActs} major Indian acts and {totalSections}+ key sections covering
                    constitutional, criminal, civil, consumer, family, labour, property, cyber, environmental, and corporate law.
                </p>
            </div>

            {/* Search & Filter — fixed icon overlap */}
            <div className="max-w-3xl mx-auto mb-10">
                <div className="paper-card p-4 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                            <Search className="w-4 h-4 text-[var(--color-ink-faint)]" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search acts, sections, keywords..."
                            className="input-warm !pl-11 w-full"
                        />
                    </div>
                    <div className="relative md:w-56 flex-shrink-0">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                            <ChevronDown className="w-4 h-4 text-[var(--color-ink-faint)]" />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="input-warm !pl-11 w-full appearance-none cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <p className="text-center text-xs text-[var(--color-ink-faint)] font-ui mt-3">
                    Showing {filtered.length} acts · {filteredSections} sections
                </p>
            </div>

            {/* Results */}
            <div className="space-y-6 max-w-4xl mx-auto">
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <Scale className="w-10 h-10 text-[var(--color-ink-faint)] mx-auto mb-4" />
                        <p className="text-[var(--color-ink-muted)] font-body">No acts found matching "{search}"</p>
                    </div>
                ) : (
                    filtered.map((act, i) => (
                        <div key={i} className="paper-card overflow-hidden animate-fade-in-up" style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                            <div className="p-6 border-b border-[var(--color-border-light)]">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <h3 className="text-lg font-display font-bold text-[var(--color-ink)]">{act.act}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="tag tag-gold text-xs w-fit">{act.category}</span>
                                        <span className="text-xs text-[var(--color-ink-faint)] font-ui">{act.sections.length} sections</span>
                                    </div>
                                </div>
                                {(act.sources?.length > 0 || act.lastVerified) && (
                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-ui">
                                        {act.lastVerified && (
                                            <span className="text-[var(--color-ink-faint)]">Verified {act.lastVerified}</span>
                                        )}
                                        {act.sources?.map(source => (
                                            <a
                                                key={source.url}
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                                            >
                                                {source.label}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="divide-y divide-[var(--color-border-light)]">
                                {act.note && (
                                    <div className="p-4 bg-amber-50/60 border-b border-amber-200/50 text-xs text-[var(--color-ink)] font-ui flex items-start gap-2.5">
                                        <span className="text-base select-none mt-[-2px]">📜</span>
                                        <div className="leading-relaxed">
                                            <strong className="text-[var(--color-accent-dark)] font-semibold">Constitutional Clarification: </strong>
                                            {act.note}
                                        </div>
                                    </div>
                                )}
                                {act.sections.map((section, j) => {
                                    const isRepealed = section.section?.includes('[Repealed]') || section.tag?.includes('Repealed');
                                    const isGeneral = section.tag === 'General Provision';

                                    return (
                                        <div
                                            key={j}
                                            className={`px-6 py-4 transition-colors ${isRepealed ? 'bg-red-50/25 hover:bg-red-50/40' : 'hover:bg-[var(--color-surface-warm)]'}`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                <div className="flex items-center flex-wrap gap-1.5 min-w-[160px]">
                                                    <span className={`font-ui font-semibold text-sm ${isRepealed ? 'text-red-700 line-through' : 'text-[var(--color-accent)]'}`}>
                                                        {section.section}
                                                    </span>
                                                    {section.tag && (
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-ui font-medium ${
                                                            isRepealed
                                                                ? 'bg-red-100 text-red-800 border border-red-200'
                                                                : isGeneral
                                                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                                                : 'bg-amber-100/70 text-amber-900 border border-amber-200/60'
                                                        }`}>
                                                            {section.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`font-display font-semibold text-sm mb-0.5 ${isRepealed ? 'text-red-900' : 'text-[var(--color-ink)]'}`}>
                                                        {section.title}
                                                    </p>
                                                    <p className="text-sm text-[var(--color-ink-muted)] font-body leading-relaxed">
                                                        {section.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto mt-12 p-5 paper-card-warm text-center">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui leading-relaxed">
                    ⚖ This legal database is for informational reference only and does not constitute legal advice.
                    Entries are curated and periodically verified against the linked sources; they are not fetched automatically.
                    Laws may be amended or supplemented by state-specific legislation. Always consult a qualified legal professional for specific guidance.
                </p>
            </div>
        </div>
    );
};

export default LegalDatabasePage;

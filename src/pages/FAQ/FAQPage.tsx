import React, { useState } from 'react';
import { ChevronDown, Search, ShieldAlert, Sparkles } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../../data/faq';

export const FAQPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-5', 'faq-11']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Technology & Preservation', 'Watch Catalog', 'Legal & Privacy'];

  const toggleFAQ = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredItems = FAQ_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            KNOWLEDGE BASE & METHODOLOGY
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial-heading font-medium text-charcoal">
            Frequently Asked Questions.
          </h1>
          <p className="mt-3 text-base text-graphite font-sans max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our horological synthesis engine, photographic preservation principles, and digital disclosures.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. skin tone, authentication, resolution)..."
              className="w-full bg-parchment/60 border border-stone-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                  activeCategory === cat
                    ? 'bg-charcoal text-ivory font-medium shadow-xs'
                    : 'bg-parchment text-graphite hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Card */}
        <div className="mb-10 p-4 rounded-xl bg-parchment border border-stone-light/80 flex items-start gap-3 text-xs text-graphite leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p>
            <strong>Authenticity & Identification Statement:</strong> LARP performs visual matches based on dial markings and case geometry. It is a styling and creative photography platform, not an official certificate of physical watch authentication or proof of asset ownership.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredItems.map(item => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-stone-light/80 bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-parchment/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-gold-dark font-mono shrink-0">
                      [{item.category.split(' ')[0]}]
                    </span>
                    <span className="font-editorial-heading text-lg font-medium text-charcoal">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-dark shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-graphite leading-relaxed border-t border-stone-light/40 animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


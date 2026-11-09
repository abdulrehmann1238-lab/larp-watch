import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, MessageSquare, Briefcase, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [category, setCategory] = useState<'business' | 'support' | 'partnership'>('partnership');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }
    setIsSubmitted(true);
    showToast('Your inquiry has been relayed to our Geneva concierge.', 'gold');
  };

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="label-tracking text-gold-dark text-[10px] block mb-2">
            CONCIERGE & CORRESPONDENCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial-heading font-medium text-charcoal">
            Let's talk about LARP.
          </h1>
          <p className="mt-3 text-base text-graphite font-sans leading-relaxed">
            For manufacture partnerships, high-horology catalog additions, or private studio inquiries, we welcome your correspondence.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl border border-stone-light p-10 md:p-14 text-center max-w-xl mx-auto shadow-luxury">
            <div className="w-14 h-14 rounded-full bg-gold/15 text-gold mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-editorial-heading text-3xl font-medium text-charcoal mb-3">
              Correspondence Received.
            </h2>
            <p className="text-sm text-graphite leading-relaxed mb-6">
              Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <strong>{formData.subject || 'LARP Platform'}</strong> has been assigned to our horological liaison. Expect a curated reply at <strong>{formData.email}</strong> within 24 business hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="py-2.5 px-6 rounded-full bg-parchment hover:bg-stone text-xs uppercase tracking-wider font-medium text-charcoal transition-colors"
            >
              Submit Another Message
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-light p-8 md:p-12 shadow-luxury">
            {/* Inquiry Categories */}
            <div className="mb-8">
              <label className="text-[11px] uppercase tracking-wider text-stone-dark font-sans block mb-3">
                Nature of Inquiry
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCategory('partnership')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    category === 'partnership'
                      ? 'border-gold bg-parchment/60 ring-1 ring-gold/40'
                      : 'border-stone-light hover:border-stone'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 mt-0.5 ${category === 'partnership' ? 'text-gold' : 'text-stone-dark'}`} />
                  <div>
                    <span className="block text-xs font-semibold text-charcoal">Partnership</span>
                    <span className="block text-[10px] text-graphite">Manufactures & Maisons</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('business')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    category === 'business'
                      ? 'border-gold bg-parchment/60 ring-1 ring-gold/40'
                      : 'border-stone-light hover:border-stone'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 mt-0.5 ${category === 'business' ? 'text-gold' : 'text-stone-dark'}`} />
                  <div>
                    <span className="block text-xs font-semibold text-charcoal">Commercial</span>
                    <span className="block text-[10px] text-graphite">Studios & Editorial</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('support')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    category === 'support'
                      ? 'border-gold bg-parchment/60 ring-1 ring-gold/40'
                      : 'border-stone-light hover:border-stone'
                  }`}
                >
                  <HelpCircle className={`w-4 h-4 mt-0.5 ${category === 'support' ? 'text-gold' : 'text-stone-dark'}`} />
                  <div>
                    <span className="block text-xs font-semibold text-charcoal">Concierge Support</span>
                    <span className="block text-[10px] text-graphite">Platform & Transformations</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-3 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. julian@vance-atelier.com"
                    className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-3 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Bespoke Archive Request for Independent Watchmaker"
                  className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-3 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your proposal or technical requirement in detail..."
                  className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-3 text-xs text-charcoal placeholder:text-stone-dark focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md border border-charcoal hover:border-gold/40"
                >
                  <Send className="w-3.5 h-3.5 text-gold" />
                  <span>Send Message to Concierge</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};


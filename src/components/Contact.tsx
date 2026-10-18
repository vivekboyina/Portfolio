import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { validateContactForm, ContactFormData } from '../utils/portfolioLogic.ts';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate swift front-end submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 600);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col items-start"
      >
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
          // 07. GET IN TOUCH
        </span>
        <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Let’s Build Together
        </h2>
        <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
          Interested in discussing internship opportunities, engineering projects, or competitive programming? Drop a message below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Email Card */}
          <div className="p-6 rounded-2xl border border-white/15 bg-white/[0.02] hover:border-white/35 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl border border-white/20 bg-white/[0.05] text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block">Email</span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-white font-medium text-sm sm:text-base hover:underline"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
              type="button"
              aria-label="Copy email to clipboard"
              className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              {copiedType === 'email' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="p-6 rounded-2xl border border-white/15 bg-white/[0.02] hover:border-white/35 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl border border-white/20 bg-white/[0.05] text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block">Phone</span>
                <a
                  href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                  className="text-white font-medium text-sm sm:text-base hover:underline"
                >
                  +91 {PORTFOLIO_DATA.personal.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
              type="button"
              aria-label="Copy phone number to clipboard"
              className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              {copiedType === 'phone' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all flex items-center gap-3 group"
            >
              <Github className="w-5 h-5 text-white/70 group-hover:text-white" />
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block">GitHub</span>
                <span className="text-white text-xs font-mono font-medium">@vivekboyina</span>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all flex items-center gap-3 group"
            >
              <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block">LinkedIn</span>
                <span className="text-white text-xs font-mono font-medium">Vivek Boyina</span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Front-End Validated Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 p-8 rounded-2xl border border-white/20 bg-white/[0.02]"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full border border-white bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-hero text-2xl font-bold text-white tracking-tight">
                  Message Sent Successfully
                </h3>
                <p className="text-white/70 text-sm max-w-md">
                  Thank you for reaching out! I will review your message and get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  type="button"
                  className="mt-4 px-6 py-2.5 rounded-full border border-white text-white text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Your Name <span className="text-white">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Satya Nadella"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                      errors.name ? 'border-red-400/80 focus:border-red-400' : 'border-white/20 focus:border-white'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs font-mono mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Email Address <span className="text-white">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. recruiter@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                      errors.email ? 'border-red-400/80 focus:border-red-400' : 'border-white/20 focus:border-white'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs font-mono mt-1.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Message <span className="text-white">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your internship role, project collaboration, or inquiry..."
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none ${
                      errors.message ? 'border-red-400/80 focus:border-red-400' : 'border-white/20 focus:border-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs font-mono mt-1.5">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold text-sm font-mono tracking-wider uppercase hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

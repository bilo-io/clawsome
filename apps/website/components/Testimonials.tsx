'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Head of Growth, ScaleAI',
      text: 'Nightclaw transformed our lead generation. What used to take a team of 10 people weeks now happens in minutes with a single swarm.',
      avatar: 'AR',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'CTO @ MetaVision',
      text: 'The vision and the execution are unmatched. It is not just another LLM wrapper; it is a full operating system for autonomous agents.',
      avatar: 'SC',
      rating: 5,
    },
    {
      name: 'Leo James',
      role: 'Independent Researcher',
      text: 'Nightclaw is the missing piece for automated data research. The swarms are incredibly robust even on the most difficult websites.',
      avatar: 'LJ',
      rating: 4,
    },
    {
      name: 'Elena Kostic',
      role: 'Engineering Lead, NeoStack',
      text: 'Our CI/CD pipelines now include browser-based agentic testing. It caught bugs we didn’t even know were possible in our frontend.',
      avatar: 'EK',
      rating: 5,
    },
    {
      name: 'Michael Wright',
      role: 'Founder, AutoBiz',
      text: 'Nightclaw is literally the backbone of my automated agencies. Minimal overhead, massive output.',
      avatar: 'MW',
      rating: 5,
    },
    {
      name: 'Jenna Lopez',
      role: 'Ops Director, FlowState',
      text: 'It’s like hiring 100 junior engineers for the price of a single server. Unbelievable ROI.',
      avatar: 'JL',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-8 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden transition-colors flex flex-col items-center">
      {/* Background decoration */}
      <Quote size={400} className="absolute -top-20 -left-20 text-slate-200 dark:text-slate-800/20 -rotate-12 -z-10" />
      
      <div className="max-w-7xl w-full">
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-4">
            Trusted by operators
          </span>
          <h2 className="text-4xl md:text-5xl font-black md:max-w-2xl tracking-tighter mb-4 dark:text-white">
            Built for those who <span className="gradient-text">move fast</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl font-medium">
            Join 5,000+ companies and innovators scaling their operations with Nightclaw.
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-6 break-inside-avoid p-8 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900/80 transition-all shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-700"} 
                  />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm border-2 border-white dark:border-slate-800 shadow-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white font-black text-sm">{testimonial.name}</span>
                  <span className="text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

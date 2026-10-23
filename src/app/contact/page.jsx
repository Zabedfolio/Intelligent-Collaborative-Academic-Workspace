'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  LifeBuoy,
  MessageSquare
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your academic inquiry has been submitted! Support will respond within 24 hours.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Academic Support & Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get in Touch with ICAW
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Have questions regarding course integration, teacher verification, student accounts, or platform feedback? We're here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Contact Details Card */}
            <div className="bg-brand text-white rounded-3xl p-8 shadow-md flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-xs text-white/80 mt-1">
                    Reach our institutional coordination and platform engineering teams.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/60 font-semibold uppercase">Email Support</p>
                      <a href="mailto:support@icaw.university.edu" className="font-medium hover:underline text-white">
                        support@icaw.edu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/60 font-semibold uppercase">Support Hours</p>
                      <p className="text-white/90">Mon - Fri: 8:00 AM - 6:00 PM EST</p>
                      <p className="text-xs text-white/70">Urgent exam assistance available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/60 font-semibold uppercase">Academic Liaison</p>
                      <p className="text-white/90">Center for Collaborative Learning & AI</p>
                      <p className="text-xs text-white/70">Academic Hall Suite 402</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-white/90 space-y-1">
                <p className="font-bold flex items-center space-x-1.5 text-white">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Institutional Adoption</span>
                </p>
                <p className="text-white/80 leading-relaxed">
                  Universities wishing to integrate custom LMS or syllabus repositories can request priority onboarding.
                </p>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Our academic operations team has received your inquiry and will follow up at <span className="font-semibold text-brand">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', role: 'student', subject: '', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Academic Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@university.edu"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Faculty / Teacher</option>
                        <option value="admin">Institutional Administrator</option>
                        <option value="other">Other / Researcher</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Course assistance, RAG query, etc."
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message / Inquiry *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe how we can assist you..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-brand text-white text-sm font-bold shadow-md hover:bg-brand-hover active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

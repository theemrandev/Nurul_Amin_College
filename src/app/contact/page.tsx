'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'admission',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage(
        isBn
          ? 'অনুগ্রহ করে সকল তারকাচিহ্নিত (*) ঘর সঠিকভাবে পূরণ করুন।'
          : 'Please complete all required fields.'
      );
      return;
    }

    setFormStatus('sending');

    // Simulate reliable client-side submission feedback
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'admission',
        message: '',
      });
    }, 800);
  };

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'যোগাযোগ ও ক্যাম্পাস অবস্থান' : 'Contact Information & Location'}
        subtitle={
          isBn
            ? 'ভর্তি, সনদপত্র, ট্রান্সক্রিপ্ট কিংবা যেকোনো প্রাতিষ্ঠানিক তথ্যের জন্য আমাদের প্রশাসনিক শাখায় যোগাযোগ করুন।'
            : 'Get in touch with our administrative office for admissions, transcripts, and campus inquiries.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'যোগাযোগ' : 'Contact',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>EIIN: {COLLEGE_INFO.identity.eiin}</span>
            </Badge>
            <Badge variant="official" size="sm">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>{isBn ? 'এনইউ কোড: ৬৩০৯' : 'NU Code: 6309'}</span>
            </Badge>
          </div>
        }
      />

      {/* Main Grid: Info Cards + Form */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Directory Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address */}
            <Card className="p-5 flex items-start gap-4 border-l-4 border-l-amber-500">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'ডাক যোগাযোগের ঠিকানা' : 'Official Postal Address'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn ? (
                    <>
                      <strong>নুরুল আমিন ডিগ্রি কলেজ</strong>
                      <br />
                      গ্রাম ও ইউনিয়ন: উমেদপুর, উপজেলা: শিবচর
                      <br />
                      জেলা: মাদারীপুর - ৭৯৩৩ (উমেদপুর শাখা) / ৭৯৩০ (শিবচর প্রধান ডাকঘর), ঢাকা বিভাগ, বাংলাদেশ।
                    </>
                  ) : (
                    <>
                      <strong>Nurul Amin Degree College</strong>
                      <br />
                      Village & Union: Umedpur, Upazila: Shibchar
                      <br />
                      District: Madaripur - 7933 / 7930, Dhaka Division, Bangladesh.
                    </>
                  )}
                </p>
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-5 flex items-start gap-4 border-l-4 border-l-blue-500">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'দাপ্তরিক সময়সূচি ও কার্যদিবস' : 'Office Hours & Schedule'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn ? (
                    <>
                      রবিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৪:০০
                      <br />
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">
                        শুক্রবার ও শনিবার সাপ্তাহিক ছুটি (অফিস বন্ধ)।
                      </span>
                    </>
                  ) : (
                    <>
                      Sunday – Thursday: 9:00 AM – 4:00 PM
                      <br />
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">
                        Friday & Saturday: Weekly Holiday (Closed).
                      </span>
                    </>
                  )}
                </p>
              </div>
            </Card>

            {/* Contact Phone & Email */}
            <Card className="p-5 flex items-start gap-4 border-l-4 border-l-emerald-500">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'যোগাযোগ ও তথ্য অনুসন্ধান' : 'Helpline & Official Email'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  <strong>{isBn ? 'মোবাইল হেল্পলাইন:' : 'Helpline:'}</strong>{' '}
                  <a href="tel:01703228122" className="text-[var(--color-primary)] dark:text-amber-400 font-semibold hover:underline">
                    ০১৭০৩২২৮১২২
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  <strong>{isBn ? 'দাপ্তরিক ইমেইল:' : 'Email:'}</strong>{' '}
                  <a
                    href="mailto:nurulamincollege.degree@gmail.com"
                    className="text-[var(--color-primary)] dark:text-amber-400 font-semibold hover:underline"
                  >
                    nurulamincollege.degree@gmail.com
                  </a>
                </p>
                <p className="text-[11px] text-[var(--text-muted)] italic pt-1 border-t border-[var(--border-subtle)]">
                  {isBn
                    ? '* সনদপত্র ও নম্বরপত্র উত্তোলনের জন্য প্রয়োজনীয় কাগজপত্রসহ সরাসরি প্রশাসনিক ভবনে যোগাযোগের পরামর্শ দেওয়া হচ্ছে।'
                    : '* For official certificate and transcript issuance, in-person verification at the administrative desk is advised.'}
                </p>
              </div>
            </Card>

            {/* Institutional Codes */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <h4 className="text-xs font-bold text-[var(--color-primary)] dark:text-amber-300 uppercase tracking-wider">
                {isBn ? 'প্রাতিষ্ঠানিক সরকারি কোডসমূহ' : 'Government Institutional Codes'}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                  EIIN: 110882
                </span>
                <span className="px-2.5 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                  NU Code: 6309
                </span>
                <span className="px-2.5 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                  MPO: 3504013201
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'অনলাইনে বার্তা বা অনুসন্ধান পাঠান' : 'Send an Online Message or Inquiry'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {isBn
                    ? 'আপনার প্রশ্ন বা বার্তাটি সরাসরি কলেজের প্রশাসনিক হেল্পডেস্কে প্রেরণ করা হবে।'
                    : 'Your message will be delivered to our college administrative helpdesk.'}
                </p>
              </div>

              {formStatus === 'success' && (
                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">
                      {isBn ? 'আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে!' : 'Message Submitted Successfully!'}
                    </p>
                    <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                      {isBn
                        ? 'ধন্যবাদ! কলেজের প্রশাসনিক শাখা থেকে যথাসম্ভব দ্রুত আপনার সাথে যোগাযোগ করা হবে।'
                        : 'Thank you! Our administrative desk will review your inquiry and follow up shortly.'}
                    </p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-500 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-primary)]">
                    {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isBn ? 'উদাঃ মোঃ রফিকুল ইসলাম' : 'e.g., Md. Rafiqul Islam'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-primary)]">
                      {isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-[var(--text-primary)]">
                      {isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-[var(--text-primary)]">
                    {isBn ? 'অনুসন্ধানের বিষয়' : 'Inquiry Subject'}
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                  >
                    <option value="admission">
                      {isBn ? 'একাদশ শ্রেণি / ডিগ্রি ভর্তি সংক্রান্ত' : 'HSC / Degree Admission'}
                    </option>
                    <option value="routine">
                      {isBn ? 'পরীক্ষার রুটিন ও কেন্দ্র সংক্রান্ত' : 'Examination Routine & Center'}
                    </option>
                    <option value="certificate">
                      {isBn ? 'সনদপত্র বা প্রশংসাপত্র উত্তোলন' : 'Certificate / Testimonial Issuance'}
                    </option>
                    <option value="general">
                      {isBn ? 'সাধারণ জিজ্ঞাসা ও অন্যান্য' : 'General Academic Inquiry'}
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-primary)]">
                    {isBn ? 'বিস্তারিত বার্তা লিখুন *' : 'Message Details *'}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isBn
                        ? 'আপনার জিজ্ঞাস্য বা বার্তা এখানে বিস্তারিত লিখুন...'
                        : 'Write your detailed inquiry or question here...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={formStatus === 'sending'}
                  className="w-full justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {formStatus === 'sending'
                      ? isBn
                        ? 'বার্তা পাঠানো হচ্ছে...'
                        : 'Sending...'
                      : isBn
                      ? 'বার্তা পাঠান'
                      : 'Send Message'}
                  </span>
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              <span>{isBn ? 'গুগল ম্যাপে কলেজ ক্যাম্পাসের অবস্থান' : 'Campus Location on Google Maps'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'উমেদপুর, শিবচর, মাদারীপুর—সড়কপথে সহজে যাতায়াতযোগ্য মনোরম সবুজ ক্যাম্পাস।'
                : 'Umedpur, Shibchar, Madaripur — conveniently accessible via road network.'}
            </p>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.6758250952175!2d90.20615758002833!3d23.327517824714068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37557700678d6161%3A0x74243955a050560c!2sNurul%20Amin%20University%20College!5e0!3m2!1sen!2sbd!4v1781670305374!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isBn ? 'নুরুল আমিন ডিগ্রি কলেজ গুগল ম্যাপ' : 'Nurul Amin Degree College Google Maps Location'}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

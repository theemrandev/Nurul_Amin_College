"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useI18n } from "../context/I18nContext";
import { personalInfo } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Contact() {
  const { t } = useI18n();
  const revealRef = useScrollReveal<HTMLElement>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) {
      errs.name = t.contact.errName;
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = t.contact.errEmail;
    }
    if (!form.message.trim()) {
      errs.message = t.contact.errMessage;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    const serviceId = (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
    ).trim();
    const templateId = (
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
    ).trim();
    const publicKey = (
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
    ).trim();

    if (!serviceId || !templateId || !publicKey) {
      setApiError(
        "EmailJS configuration missing. Please verify NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local."
      );
      setIsSubmitting(false);
      return;
    }

    // Map form fields to template variables
    const templateParams: Record<string, unknown> = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || "New Portfolio Contact Message",
      message: form.message.trim(),
      // Common EmailJS template parameter aliases for comprehensive compatibility
      from_name: form.name.trim(),
      from_email: form.email.trim(),
      reply_to: form.email.trim(),
      to_email: "theemrandev@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setApiError(null);
    } catch (err: unknown) {
      console.error("EmailJS dispatch failed:", err);
      const errorText =
        err && typeof err === "object" && "text" in err && typeof (err as { text: unknown }).text === "string"
          ? (err as { text: string }).text
          : t.contact.errorMessage;
      setApiError(errorText || t.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={revealRef}
      aria-labelledby="contact-heading"
      className="reveal-on-scroll py-16 sm:py-24 border-t border-neutral-200 dark:border-neutral-800 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-accent font-semibold">
            {t.contact.sectionTag}
          </span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2 mb-4"
          >
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div
            className="stagger-child lg:col-span-5 space-y-6"
            style={{ "--stagger-delay": "80ms" } as React.CSSProperties}
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {t.contact.directTitle}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8">
                {t.contact.directDesc}
              </p>

              <div className="space-y-6">
                {/* Location */}
                <div className="group flex items-start gap-3.5 p-3 rounded-2xl glass-panel hover:border-editorial-accent/50 transition-colors">
                  <div className="grid place-items-center size-10 rounded-2xl glass-button text-editorial-accent group-hover:bg-editorial-accent group-hover:text-white shrink-0 mt-0.5 transition-colors">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-500 block">
                      {t.contact.locationLabel}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5 block">
                      {t.contact.locationValue}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start gap-3.5 p-3 rounded-2xl glass-panel hover:border-editorial-accent/50 transition-colors">
                  <div className="grid place-items-center size-10 rounded-2xl glass-button text-editorial-accent group-hover:bg-editorial-accent group-hover:text-white shrink-0 mt-0.5 transition-colors">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-500 block">
                      {t.contact.emailLabel}
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-editorial-accent dark:hover:text-editorial-accent transition-colors mt-0.5 block break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-3.5 p-3 rounded-2xl glass-panel hover:border-editorial-accent/50 transition-colors">
                  <div className="grid place-items-center size-10 rounded-2xl glass-button text-editorial-accent group-hover:bg-editorial-accent group-hover:text-white shrink-0 mt-0.5 transition-colors">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-500 block">
                      {t.contact.phoneLabel}
                    </span>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                      className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-editorial-accent dark:hover:text-editorial-accent transition-colors mt-0.5 block"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="stagger-child lg:col-span-7"
            style={{ "--stagger-delay": "180ms" } as React.CSSProperties}
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5 hover:shadow-xl transition-all duration-300">
              {submitted ? (
                <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="grid place-items-center size-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    {t.contact.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setApiError(null);
                    }}
                    className="mt-4 px-5 py-2 text-xs font-semibold rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {apiError && (
                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200">
                      <AlertCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">{t.contact.errorTitle}</p>
                        <p className="text-xs leading-relaxed opacity-90">
                          {apiError}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 mb-1.5"
                      >
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        disabled={isSubmitting}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder={t.contact.namePlaceholder}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white/85 dark:bg-neutral-800/80 backdrop-blur-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                          errors.name
                            ? "border-red-500 dark:border-red-500"
                            : "border-neutral-200/90 dark:border-neutral-700"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 mb-1.5"
                      >
                        {t.contact.emailLabel} *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        disabled={isSubmitting}
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder={t.contact.emailPlaceholder}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white/85 dark:bg-neutral-800/80 backdrop-blur-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                          errors.email
                            ? "border-red-500 dark:border-red-500"
                            : "border-neutral-200/90 dark:border-neutral-700"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="size-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      {t.contact.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      disabled={isSubmitting}
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-neutral-200/90 dark:border-neutral-700 bg-white/85 dark:bg-neutral-800/80 backdrop-blur-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      disabled={isSubmitting}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder={t.contact.messagePlaceholder}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white/85 dark:bg-neutral-800/80 backdrop-blur-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-all resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
                        errors.message
                          ? "border-red-500 dark:border-red-500"
                          : "border-neutral-200/90 dark:border-neutral-700"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="size-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full bg-editorial-accent hover:bg-editorial-accentHover text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    <span>
                      {isSubmitting
                        ? t.contact.sending
                        : t.contact.sendButton}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

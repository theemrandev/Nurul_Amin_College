/**
 * Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ)
 * Enhanced Core Application Script
 * Features:
 * - Persistent Bilingual System (Bengali / English) with Strict Language Rules
 * - Distinctive Academic Navigation with Accessible Desktop Dropdowns
 * - Animated Hamburger-to-Close Button & Touch-Optimized Mobile Drawer
 * - Mobile Accordion Submenus with Keyboard Support
 * - Dynamic Notice Filtering & Live Search
 * - FAQ Accordion with WCAG Compliance
 * - Accessible Image Modal / Lightbox
 * - Contact Form Validation & State Feedback
 * - Active Page & Parent Navigation Highlighting
 */

(function () {
    'use strict';

    // 1. Language System
    const DEFAULT_LANG = 'bn'; // Bengali prioritized as first-class language
    let currentLang = localStorage.getItem('nadc_language') || localStorage.getItem('preferredLang') || DEFAULT_LANG;

    function applyLanguage(lang) {
        if (!TRANSLATIONS[lang]) lang = 'bn';
        currentLang = lang;
        localStorage.setItem('nadc_language', lang);
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;

        // Apply font styling class to body
        if (lang === 'bn') {
            document.body.classList.add('font-bn');
            document.body.classList.remove('font-en');
        } else {
            document.body.classList.add('font-en');
            document.body.classList.remove('font-bn');
        }

        // Update all data-i18n elements
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                el.textContent = TRANSLATIONS[lang][key];
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                el.placeholder = TRANSLATIONS[lang][key];
            }
        });

        // Update language toggle buttons
        const toggleBtns = document.querySelectorAll('.lang-toggle-btn');
        toggleBtns.forEach(btn => {
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // Re-render notices & student services
        updateFeedStatusBar();
        renderNotices();
        renderStudentServices();
    }

    window.switchLanguage = function (lang) {
        applyLanguage(lang);
    };

    // 2. Active Page Highlighting & Parent Highlighting
    function highlightActiveNav() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        // Clear all
        document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('active-parent');
        });

        // Highlight matching link
        const targetLinks = document.querySelectorAll(`a[href="${page}"], a[href="${page === '' ? 'index.html' : page}"]`);
        targetLinks.forEach(link => {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            // If inside desktop dropdown, highlight parent
            const parentDropdown = link.closest('.has-dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('active-parent');
                const trigger = parentDropdown.querySelector('.dropdown-trigger');
                if (trigger) trigger.classList.add('active');
            }

            // If inside mobile submenu, expand parent accordion
            const mobileSubmenu = link.closest('.mobile-submenu');
            if (mobileSubmenu) {
                mobileSubmenu.classList.add('open');
                const toggle = mobileSubmenu.previousElementSibling;
                if (toggle && toggle.classList.contains('mobile-dropdown-btn')) {
                    toggle.classList.add('active');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    // 3. Mobile Navigation Drawer & Hamburger Morphing
    function setupMobileNav() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const mobileDrawer = document.querySelector('.mobile-nav-drawer');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const closeBtn = document.querySelector('.mobile-nav-close');

        if (!toggleBtn || !mobileDrawer) return;

        function openDrawer() {
            mobileDrawer.classList.add('open');
            if (overlay) overlay.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            mobileDrawer.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        toggleBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeDrawer();
            }
        });

        // Close drawer when clicking any navigation link
        const mobileLinks = mobileDrawer.querySelectorAll('a:not(.mobile-dropdown-btn)');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });

        // Mobile dropdown submenus accordion
        const mobileDropdownBtns = mobileDrawer.querySelectorAll('.mobile-dropdown-btn');
        mobileDropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const submenu = btn.nextElementSibling;
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    btn.setAttribute('aria-expanded', 'false');
                    btn.classList.remove('active');
                    submenu.classList.remove('open');
                } else {
                    btn.setAttribute('aria-expanded', 'true');
                    btn.classList.add('active');
                    submenu.classList.add('open');
                }
            });
        });
    }

    // 4. Dynamic Notice Rendering, Live Official Feeds & Admin Publisher
    let activeCategory = 'all';
    let searchQuery = '';
    let activeFeedTab = 'college';
    let liveOfficialData = (typeof COLLEGE_DATA !== 'undefined' && COLLEGE_DATA.officialNotices) ? COLLEGE_DATA.officialNotices : null;

    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function sanitizeUrl(url) {
        if (typeof url !== 'string') return '#';
        const trimmed = url.trim();
        // Allow safe http(s) URLs and internal relative html paths
        if (/^https?:\/\/[^\s<>"']+$/i.test(trimmed) || /^[a-zA-Z0-9_\-\/]+\.html([?#][^\s<>"']*)?$/i.test(trimmed)) {
            return trimmed;
        }
        return '#';
    }

    // Canonical Storage Keys
    const ADMIN_NOTICES_STORAGE_KEY = 'nurulAminCollege_adminNotices';
    const ADMIN_SESSION_STORAGE_KEY = 'nurulAminCollege_adminSession';

    // Canonical Admin Notices Fetcher with Migration & Safe Parsing
    function getAdminNotices() {
        try {
            const stored = localStorage.getItem(ADMIN_NOTICES_STORAGE_KEY);
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) return parsed;
            }
            // Migration: check for legacy nadc_admin_draft_notices if canonical key is empty
            const legacy = localStorage.getItem('nadc_admin_draft_notices');
            if (legacy !== null) {
                const parsedLegacy = JSON.parse(legacy);
                if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
                    localStorage.setItem(ADMIN_NOTICES_STORAGE_KEY, JSON.stringify(parsedLegacy));
                    return parsedLegacy;
                }
            }
            return [];
        } catch (e) {
            console.warn('Storage read warning for admin notices:', e);
            return [];
        }
    }

    // Canonical Admin Notices Saver
    function saveAdminNotices(notices) {
        if (!Array.isArray(notices)) {
            throw new Error('Notices data must be an array.');
        }
        try {
            localStorage.setItem(ADMIN_NOTICES_STORAGE_KEY, JSON.stringify(notices));
            // Keep legacy draft key synchronized for backward compatibility
            localStorage.setItem('nadc_admin_draft_notices', JSON.stringify(notices));
            return true;
        } catch (e) {
            console.error('Storage write error for admin notices:', e);
            throw new Error('LocalStorage write failed: ' + e.message);
        }
    }

    // Add new admin notice
    function addAdminNotice(noticeData) {
        const notices = getAdminNotices();
        const uniqueId = `notice-adm-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
        const notice = {
            id: uniqueId,
            ...noticeData,
            isAdminCreated: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        notices.unshift(notice);
        saveAdminNotices(notices);
        return notice;
    }

    // Update existing admin notice
    function updateAdminNotice(id, updatedData) {
        const notices = getAdminNotices();
        const index = notices.findIndex(n => n.id === id);
        if (index === -1) {
            throw new Error('Notice not found for update.');
        }
        const existing = notices[index];
        notices[index] = {
            ...existing,
            ...updatedData,
            id: existing.id, // Strictly preserve original stable ID
            createdAt: existing.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        saveAdminNotices(notices);
        return notices[index];
    }

    // Delete admin notice
    function deleteAdminNotice(id) {
        const notices = getAdminNotices();
        const filtered = notices.filter(n => n.id !== id);
        if (filtered.length === notices.length) {
            return false;
        }
        saveAdminNotices(filtered);
        return true;
    }

    // Legacy compatibility wrapper
    function getAdminDraftNotices() {
        return getAdminNotices();
    }

    // Admin Session Helpers
    function checkAdminSession() {
        try {
            const session = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) || localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
            if (!session) return null;
            const parsed = JSON.parse(session);
            if (parsed && parsed.username === 'theemrandev') {
                return parsed;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    function setAdminSession() {
        const session = {
            username: 'theemrandev',
            role: 'Super Administrator',
            token: `adm-token-${Date.now()}`,
            loggedInAt: new Date().toISOString()
        };
        sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
    }

    function clearAdminSession() {
        sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
        localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    }

    function renderNotices() {
        const noticeContainer = document.getElementById('notices-list');
        if (!noticeContainer) return;

        const isBangla = currentLang === 'bn';

        // TAB 1: Dhaka Board Gateway Info
        if (activeFeedTab === 'dhaka-board') {
            const filterBar = document.querySelector('.notices-filter-bar');
            if (filterBar) filterBar.style.display = 'none';

            noticeContainer.innerHTML = `
                <div class="gateway-notice-card" style="grid-column: 1 / -1;">
                    <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 18px;">
                        <i class="fas fa-shield-alt" style="font-size: 2.2rem; color: var(--color-primary); margin-top: 4px;" aria-hidden="true"></i>
                        <div>
                            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 6px;">
                                <h3 style="font-size: 1.25rem; color: var(--color-primary); margin: 0;">${isBangla ? 'ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড' : 'Board of Intermediate & Secondary Education, Dhaka'}</h3>
                                <span class="source-badge badge-official">${isBangla ? 'অফিসিয়াল গেটওয়ে' : 'Official Protected Gateway'}</span>
                            </div>
                            <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.7; margin: 0;">
                                ${isBangla 
                                    ? 'ঢাকা শিক্ষা বোর্ডের নোটিশ পোর্টালটি একটি স্বয়ংক্রিয় নিরাপত্তা ব্যবস্থা (bpanel.challenge) দ্বারা সুরক্ষিত। সাইবার নিরাপত্তা নীতি ও বৈধ ব্যবহারের স্বার্থে কোনোপ্রকার অননুমোদিত স্ক্র্যাপিং করা হয় না। শিক্ষার্থীরা নিচের সত্যায়িত বোতামের মাধ্যমে সরাসরি বোর্ডের মূল সার্ভার থেকে প্রজ্ঞাপন দেখতে পারবেন।'
                                    : 'The Board of Intermediate & Secondary Education, Dhaka protects its notice portal with an automated browser security gateway (bpanel.challenge). In strict adherence to state cybersecurity and legitimate access principles, automated scrapers are not deployed. Students and guardians are encouraged to access circulars directly on the official board server via the verified link below.'}
                            </p>
                        </div>
                    </div>

                    <div style="background: var(--color-surface-muted); padding: 18px; border-radius: var(--radius-md); margin-bottom: 22px; border-left: 4px solid var(--color-accent);">
                        <h4 style="font-size: 1rem; color: var(--color-primary); margin-bottom: 8px;">
                            <i class="fas fa-info-circle" style="color: var(--color-accent); margin-right: 6px;"></i> ${isBangla ? 'সরাসরি অফিসিয়াল নোটিশ সেকশন' : 'Direct Official Board Notice Sections'}
                        </h4>
                        <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin: 0 0 10px 0;">
                            ${isBangla ? 'কলেজ EIIN: ১১০৮৮২ • অধিভুক্ত বোর্ড: ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড' : 'College EIIN: 110882 • Affiliated Board: BISE Dhaka'}
                        </p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <a href="https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 9px 18px; font-size: 0.9rem;">
                                <span>${isBangla ? 'ঢাকা বোর্ড এইচএসসি কর্নার' : 'Dhaka Board HSC Corner'}</span>
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                            </a>
                            <a href="https://dhakaeducationboard.gov.bd/" target="_blank" rel="noopener noreferrer" class="notice-filter-btn" style="padding: 9px 18px; font-size: 0.9rem;">
                                <span>${isBangla ? 'ঢাকা বোর্ড মূল পোর্টাল' : 'Dhaka Board Official Portal'}</span>
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                            </a>
                            <a href="routine.html" class="notice-filter-btn" style="padding: 9px 18px; font-size: 0.9rem;">
                                <span>${isBangla ? 'পরীক্ষার রুটিন ও নির্দেশিকা' : 'Exam Routine & Guidelines'}</span>
                                <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Show filter bar on campus & NU tabs
        const filterBar = document.querySelector('.notices-filter-bar');
        if (filterBar) filterBar.style.display = 'flex';

        // TAB 2: National University Live Feed
        if (activeFeedTab === 'nu-live') {
            const nuNotices = (liveOfficialData && liveOfficialData.nuNotices) ? liveOfficialData.nuNotices : [];
            const searchLower = searchQuery.toLowerCase();

            const filteredNU = nuNotices.filter(notice => {
                const matchesCat = activeCategory === 'all' || notice.category === activeCategory;
                const titleMatch = (isBangla ? notice.titleBn : (notice.titleEn || notice.titleBn)).toLowerCase().includes(searchLower);
                return matchesCat && titleMatch;
            });

            if (filteredNU.length === 0) {
                noticeContainer.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
                        <i class="fas fa-search empty-icon" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 15px;" aria-hidden="true"></i>
                        <h3 style="color: var(--color-primary);">${isBangla ? 'কোনো নোটিশ পাওয়া যায়নি' : 'No Notices Found'}</h3>
                        <p style="color: var(--color-text-secondary);">${isBangla ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি বেছে নিন।' : 'Please try adjusting your search terms or filter.'}</p>
                    </div>
                `;
                return;
            }

            noticeContainer.innerHTML = filteredNU.map(notice => {
                const title = isBangla ? notice.titleBn : (notice.titleEn || notice.titleBn);
                const categoryName = notice.category === 'exam' 
                    ? (isBangla ? 'পরীক্ষা' : 'Examination')
                    : (notice.category === 'formfillup' ? (isBangla ? 'ফরম পূরণ' : 'Form Fill-up') : (isBangla ? 'সাধারণ' : 'General'));

                const safeTitle = escapeHtml(title);
                const safeCategoryName = escapeHtml(categoryName);
                const safeDate = escapeHtml(notice.date);
                const safeLink = sanitizeUrl(notice.link);
                const safeSource = escapeHtml(isBangla ? notice.sourceBn : notice.source);
                const safeCat = escapeHtml(notice.category || 'general');

                return `
                    <article class="notice-card featured" data-category="${safeCat}">
                        <div class="notice-header">
                            <span class="notice-badge badge-${safeCat}">${safeCategoryName}</span>
                            <time class="notice-date">
                                <i class="far fa-calendar-alt" aria-hidden="true"></i> ${safeDate}
                            </time>
                        </div>
                        <h3 class="notice-title">
                            <a href="${safeLink}" target="_blank" rel="noopener noreferrer">${safeTitle}</a>
                        </h3>
                        <div class="quick-card-highlight" style="margin-bottom: 16px;">
                            <i class="fas fa-satellite-dish" aria-hidden="true"></i> ${isBangla ? 'জাতীয় বিশ্ববিদ্যালয় পাবলিক সার্ভার থেকে সরাসরি সংগৃহীত' : 'Extracted directly from NU public server'}
                        </div>
                        <div class="notice-footer">
                            <span class="notice-source"><i class="fas fa-check-circle" aria-hidden="true"></i> ${safeSource}</span>
                            <a href="${safeLink}" class="notice-action-btn" target="_blank" rel="noopener noreferrer">
                                <span>${isBangla ? 'মূল পিডিএফ দেখুন' : 'View Official PDF'}</span>
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                            </a>
                        </div>
                    </article>
                `;
            }).join('');
            return;
        }

        // TAB 3: College Campus Notices (+ any admin drafts)
        const adminDrafts = getAdminDraftNotices();
        const allNotices = [...adminDrafts, ...COLLEGE_DATA.notices];

        const filtered = allNotices.filter(notice => {
            const matchesCat = activeCategory === 'all' || notice.category === activeCategory;
            const searchLower = searchQuery.toLowerCase();
            const titleMatch = (isBangla ? notice.titleBn : notice.titleEn).toLowerCase().includes(searchLower);
            const summaryMatch = (isBangla ? notice.summaryBn : notice.summaryEn).toLowerCase().includes(searchLower);
            return matchesCat && (titleMatch || summaryMatch);
        });

        if (filtered.length === 0) {
            noticeContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
                    <i class="fas fa-search empty-icon" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 15px;" aria-hidden="true"></i>
                    <h3 style="color: var(--color-primary);">${isBangla ? 'কোনো নোটিশ পাওয়া যায়নি' : 'No Notices Found'}</h3>
                    <p style="color: var(--color-text-secondary);">${isBangla ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি বেছে নিন।' : 'Please try adjusting your search terms or filter.'}</p>
                </div>
            `;
            return;
        }

        noticeContainer.innerHTML = filtered.map(notice => {
            const title = isBangla ? notice.titleBn : notice.titleEn;
            const summary = isBangla ? notice.summaryBn : notice.summaryEn;
            const categoryName = isBangla ? notice.categoryNameBn : notice.categoryNameEn;
            const targetAttr = notice.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
            const actionText = notice.category === 'routine' 
                ? (isBangla ? 'রুটিন দেখুন' : 'View Schedule')
                : (isBangla ? 'বিস্তারিত সার্কুলার' : 'Read Circular');
            const draftBadge = (notice.isDraft || notice.isAdminCreated) 
                ? `<span class="source-badge badge-direct" style="margin-left: 8px;"><i class="fas fa-user-shield" style="margin-right: 4px;"></i>${isBangla ? 'অ্যাডমিন নোটিশ' : 'Admin Notice'}</span>` 
                : '';

            const safeTitle = escapeHtml(title);
            const safeSummary = escapeHtml(summary);
            const safeCategoryName = escapeHtml(categoryName);
            const safeLink = sanitizeUrl(notice.link);
            const safeSource = escapeHtml(notice.source);
            const safeCat = escapeHtml(notice.category || 'general');

            return `
                <article class="notice-card ${notice.featured ? 'featured' : ''}" data-category="${safeCat}">
                    <div class="notice-header">
                        <div>
                            <span class="notice-badge badge-${safeCat}">${safeCategoryName}</span>
                            ${draftBadge}
                        </div>
                        <time class="notice-date" datetime="${escapeHtml(notice.date)}">
                            <i class="far fa-calendar-alt" aria-hidden="true"></i> ${formatDate(notice.date, isBangla)}
                        </time>
                    </div>
                    <h3 class="notice-title">
                        <a href="${safeLink}" ${targetAttr}>${safeTitle}</a>
                    </h3>
                    <p class="notice-summary">${safeSummary}</p>
                    <div class="notice-footer">
                        <span class="notice-source"><i class="fas fa-check-circle" aria-hidden="true"></i> ${safeSource}</span>
                        <a href="${safeLink}" class="notice-action-btn" ${targetAttr}>
                            ${actionText} <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }

    function formatDate(dateStr, isBangla) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        
        if (isBangla) {
            const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
            const toBengaliNumber = num => String(num).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);
            return `${toBengaliNumber(date.getDate())} ${monthsBn[date.getMonth()]}, ${toBengaliNumber(date.getFullYear())}`;
        } else {
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    }

    function setupNoticeFilters() {
        const filterBtns = document.querySelectorAll('.notice-filter-btn');
        const searchInput = document.getElementById('notice-search-input');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category') || 'all';
                renderNotices();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                renderNotices();
            });
        }
    }

    // 4b. Notice Feed Tabs & Live Sync
    function updateFeedStatusBar() {
        const container = document.getElementById('feed-status-container');
        const badgeText = document.getElementById('feed-status-text');
        const badge = document.getElementById('feed-badge');
        const updateTime = document.getElementById('feed-last-updated-time');
        if (!container || !liveOfficialData) return;

        const isBangla = currentLang === 'bn';

        // Strict verification: green live badge is ONLY shown if server-side fetch actually succeeded
        const isStrictlyLive = Boolean(
            liveOfficialData &&
            liveOfficialData.isLiveServer === true &&
            liveOfficialData.isLive === true &&
            liveOfficialData.status === 'live'
        );

        if (updateTime) {
            const timeVal = isBangla 
                ? (liveOfficialData.lastSuccessfulSyncFormattedBn || liveOfficialData.lastSyncedFormattedBn || liveOfficialData.lastSuccessfulSync || liveOfficialData.lastSynced)
                : (liveOfficialData.lastSuccessfulSyncFormattedEn || liveOfficialData.lastSyncedFormattedEn || liveOfficialData.lastSuccessfulSync || liveOfficialData.lastSynced);
            updateTime.textContent = timeVal || (isBangla ? '২৬ অক্টোবর ২০২৬' : '26 Oct 2026');
        }

        if (badge && badgeText) {
            if (isStrictlyLive) {
                badge.className = 'feed-status-badge live';
                badgeText.textContent = isBangla ? 'লাইভ সরকারি ফিড (সক্রিয়)' : 'Live Official Feed';
            } else {
                badge.className = 'feed-status-badge snapshot';
                badgeText.textContent = isBangla 
                    ? 'লাইভ আপডেট অনুপলব্ধ — সংরক্ষিত নোটিশ' 
                    : 'Live update unavailable — showing cached notices';
            }
        }
    }

    async function loadOfficialNoticesData() {
        try {
            let loaded = false;
            try {
                const res = await fetch('/api/live-notices');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.sources && data.sources.nu && Array.isArray(data.sources.nu.notices)) {
                        const nu = data.sources.nu;
                        liveOfficialData = {
                            lastSynced: data.lastSynced,
                            lastSuccessfulSync: data.lastSuccessfulSync,
                            lastSuccessfulSyncFormattedEn: data.lastSuccessfulSyncFormattedEn,
                            lastSuccessfulSyncFormattedBn: data.lastSuccessfulSyncFormattedBn,
                            lastSyncedFormattedEn: data.lastSyncedFormattedEn,
                            lastSyncedFormattedBn: data.lastSyncedFormattedBn,
                            isLiveServer: true,
                            isLive: nu.isLive === true && nu.status === 'live',
                            status: nu.status || 'live',
                            error: nu.error || null,
                            nuNotices: nu.notices
                        };
                        updateFeedStatusBar();
                        if (activeFeedTab === 'nu-live') renderNotices();
                        loaded = true;
                    }
                }
            } catch (err) {}

            // Fallback to static JSON file (for static hosting like GitHub Pages)
            if (!loaded) {
                const fallbackRes = await fetch('data/official-notices.json');
                if (fallbackRes.ok) {
                    const data = await fallbackRes.json();
                    if (data && data.sources && data.sources.nu && Array.isArray(data.sources.nu.notices)) {
                        const nu = data.sources.nu;
                        liveOfficialData = {
                            lastSynced: data.lastSynced,
                            lastSuccessfulSync: data.lastSuccessfulSync,
                            lastSuccessfulSyncFormattedEn: data.lastSuccessfulSyncFormattedEn,
                            lastSuccessfulSyncFormattedBn: data.lastSuccessfulSyncFormattedBn,
                            lastSyncedFormattedEn: data.lastSyncedFormattedEn,
                            lastSyncedFormattedBn: data.lastSyncedFormattedBn,
                            isLiveServer: false,
                            isLive: false,
                            status: 'offline_cached',
                            error: 'Static deployment — dynamic backend unavailable',
                            nuNotices: nu.notices
                        };
                        updateFeedStatusBar();
                        if (activeFeedTab === 'nu-live') renderNotices();
                    }
                }
            }
        } catch (e) {}
    }

    function setupFeedTabs() {
        const feedTabs = document.querySelectorAll('.feed-tab-btn');
        const feedStatusBar = document.getElementById('feed-status-container');
        const syncBtn = document.getElementById('btn-sync-notices');
        const msgBox = document.getElementById('feed-sync-msg');

        feedTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                feedTabs.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeFeedTab = btn.getAttribute('data-feed') || 'college';

                if (feedStatusBar) {
                    feedStatusBar.style.display = (activeFeedTab === 'nu-live') ? 'flex' : 'none';
                }
                if (msgBox && activeFeedTab !== 'nu-live') {
                    msgBox.style.display = 'none';
                }

                renderNotices();
            });
        });

        if (syncBtn) {
            syncBtn.addEventListener('click', async () => {
                const isBangla = currentLang === 'bn';
                const originalHtml = syncBtn.innerHTML;

                syncBtn.disabled = true;
                syncBtn.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> <span>${isBangla ? 'সিঙ্ক হচ্ছে...' : 'Syncing...'}</span>`;
                if (msgBox) msgBox.style.display = 'none';

                try {
                    const res = await fetch('/api/sync-notices');
                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.sources && data.sources.nu) {
                            const nu = data.sources.nu;
                            const isSuccess = (nu.status === 'live' && nu.isLive === true);

                            liveOfficialData = {
                                lastSynced: data.lastSynced,
                                lastSuccessfulSync: data.lastSuccessfulSync,
                                lastSuccessfulSyncFormattedEn: data.lastSuccessfulSyncFormattedEn,
                                lastSuccessfulSyncFormattedBn: data.lastSuccessfulSyncFormattedBn,
                                lastSyncedFormattedEn: data.lastSyncedFormattedEn,
                                lastSyncedFormattedBn: data.lastSyncedFormattedBn,
                                isLiveServer: true,
                                isLive: isSuccess,
                                status: nu.status,
                                error: nu.error,
                                nuNotices: nu.notices
                            };

                            if (msgBox) {
                                msgBox.style.display = 'block';
                                if (isSuccess) {
                                    msgBox.style.background = '#ecfdf5';
                                    msgBox.style.color = '#065f46';
                                    msgBox.style.border = '1px solid #a7f3d0';
                                    msgBox.textContent = isBangla 
                                        ? '✓ জাতীয় বিশ্ববিদ্যালয় লাইভ সার্ভার থেকে সফলভাবে তথ্য সিঙ্ক হয়েছে।' 
                                        : '✓ Successfully synced live notices from National University server.';
                                } else {
                                    msgBox.style.background = '#fffbeb';
                                    msgBox.style.color = '#92400e';
                                    msgBox.style.border = '1px solid #fde68a';
                                    msgBox.textContent = isBangla 
                                        ? '⚠ জাতীয় বিশ্ববিদ্যালয়ের সার্ভার সংযোগ ব্যর্থ — পূর্ববর্তী সংরক্ষিত নোটিশ বহাল রয়েছে।' 
                                        : '⚠ National University server unreachable — displaying preserved cached snapshot.';
                                }
                            }
                        }
                    } else {
                        // Backend API returned non-200 (e.g. 404 on static hosting)
                        await loadOfficialNoticesData();
                        if (msgBox) {
                            msgBox.style.display = 'block';
                            msgBox.style.background = '#eff6ff';
                            msgBox.style.color = '#1e40af';
                            msgBox.style.border = '1px solid #bfdbfe';
                            msgBox.textContent = isBangla
                                ? 'ℹ লাইভ ব্যাকএন্ড এপিআই অনুপলব্ধ (স্ট্যাটিক হোস্ট)। সর্বশেষ সংরক্ষিত নোটিশ প্রদর্শিত হচ্ছে।'
                                : 'ℹ Live sync API unavailable on static hosting. Displaying verified cached notices.';
                        }
                    }
                } catch (e) {
                    // Network failure (offline client or static host)
                    await loadOfficialNoticesData();
                    if (msgBox) {
                        msgBox.style.display = 'block';
                        msgBox.style.background = '#eff6ff';
                        msgBox.style.color = '#1e40af';
                        msgBox.style.border = '1px solid #bfdbfe';
                        msgBox.textContent = isBangla
                            ? 'ℹ লাইভ ব্যাকএন্ড এপিআই অনুপলব্ধ (স্ট্যাটিক হোস্ট)। সর্বশেষ সংরক্ষিত নোটিশ প্রদর্শিত হচ্ছে।'
                            : 'ℹ Live sync API unavailable on static hosting. Displaying verified cached notices.';
                    }
                }

                updateFeedStatusBar();
                renderNotices();
                syncBtn.disabled = false;
                syncBtn.innerHTML = originalHtml;
            });
        }
    }

    // 4c. Administrator Notice Publisher Sandbox
    function setupAdminNoticePublisher() {
        const toggleBtn = document.getElementById('admin-toggle-btn');
        const panel = document.getElementById('admin-publisher-panel');
        const form = document.getElementById('admin-notice-form');
        const exportBtn = document.getElementById('admin-btn-export');
        const clearBtn = document.getElementById('admin-btn-clear');
        const msgBox = document.getElementById('admin-form-msg');

        if (!toggleBtn || !panel || !form) return;

        // Today's date as default
        const dateInput = document.getElementById('admin-date');
        if (dateInput && !dateInput.value) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }

        toggleBtn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            if (isOpen) {
                panel.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                panel.classList.add('open');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const isBangla = currentLang === 'bn';

            const titleBn = document.getElementById('admin-title-bn').value.trim();
            const titleEn = document.getElementById('admin-title-en').value.trim();
            const category = document.getElementById('admin-category').value;
            const date = document.getElementById('admin-date').value || new Date().toISOString().split('T')[0];
            const summaryBn = document.getElementById('admin-summary-bn').value.trim();
            const summaryEn = document.getElementById('admin-summary-en').value.trim();
            const link = document.getElementById('admin-link').value.trim() || 'notice.html';

            const catMapBn = { exam: 'পরীক্ষা', routine: 'রুটিন', admission: 'ভর্তি', general: 'সাধারণ' };
            const catMapEn = { exam: 'Examination', routine: 'Routine', admission: 'Admission', general: 'General' };

            const newNotice = {
                id: `admin-${Date.now()}`,
                titleBn,
                titleEn,
                date,
                category,
                categoryNameBn: catMapBn[category] || 'সাধারণ',
                categoryNameEn: catMapEn[category] || 'General',
                summaryBn,
                summaryEn,
                featured: true,
                link,
                isExternal: link.startsWith('http'),
                source: 'Principal Office (College Admin Draft)',
                isDraft: true
            };

            const drafts = getAdminNotices();
            drafts.unshift(newNotice);
            saveAdminNotices(drafts);

            // Switch to college tab and re-render
            activeFeedTab = 'college';
            const collegeTabBtn = document.querySelector('.feed-tab-btn[data-feed="college"]');
            if (collegeTabBtn) {
                document.querySelectorAll('.feed-tab-btn').forEach(b => b.classList.remove('active'));
                collegeTabBtn.classList.add('active');
            }

            renderNotices();

            if (msgBox) {
                msgBox.style.color = '#059669';
                msgBox.textContent = isBangla 
                    ? '✓ নোটিশ ড্রাফট সফলভাবে সংযুক্ত ও প্রিভিউ বোর্ডে প্রদর্শিত হয়েছে।'
                    : '✓ Notice draft saved to local preview and rendered above.';
            }

            form.reset();
            if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        });

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const isBangla = currentLang === 'bn';
                const titleBn = document.getElementById('admin-title-bn').value.trim() || 'নোটিশ শিরোনাম';
                const titleEn = document.getElementById('admin-title-en').value.trim() || 'Notice Title';
                const category = document.getElementById('admin-category').value;
                const date = document.getElementById('admin-date').value || new Date().toISOString().split('T')[0];
                const summaryBn = document.getElementById('admin-summary-bn').value.trim() || 'নোটিশ সারসংক্ষেপ';
                const summaryEn = document.getElementById('admin-summary-en').value.trim() || 'Notice Summary';
                const link = document.getElementById('admin-link').value.trim() || 'notice.html';

                const catMapBn = { exam: 'পরীক্ষা', routine: 'রুটিন', admission: 'ভর্তি', general: 'সাধারণ' };
                const catMapEn = { exam: 'Examination', routine: 'Routine', admission: 'Admission', general: 'General' };

                const snippet = JSON.stringify({
                    id: `notice-${Date.now()}`,
                    titleEn,
                    titleBn,
                    date,
                    category,
                    categoryNameEn: catMapEn[category] || 'General',
                    categoryNameBn: catMapBn[category] || 'সাধারণ',
                    summaryEn,
                    summaryBn,
                    featured: false,
                    link,
                    isExternal: link.startsWith('http'),
                    source: 'Principal\'s Office, NADC'
                }, null, 2);

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(snippet);
                }

                if (msgBox) {
                    msgBox.style.color = '#1e40af';
                    msgBox.textContent = isBangla
                        ? '✓ JSON কোড ক্লিপবোর্ডে কপি হয়েছে! ওয়েবমাস্টার এটি js/data.js ফাইলে যুক্ত করতে পারেন।'
                        : '✓ JSON snippet copied to clipboard! Ready to paste into js/data.js.';
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const isBangla = currentLang === 'bn';
                localStorage.removeItem('nadc_admin_draft_notices');
                localStorage.removeItem(ADMIN_NOTICES_STORAGE_KEY);
                renderNotices();
                if (msgBox) {
                    msgBox.style.color = '#b91c1c';
                    msgBox.textContent = isBangla
                        ? '✓ লোকাল প্রিভিউ ড্রাফটসমূহ সফলভাবে মুছে ফেলা হয়েছে।'
                        : '✓ Local preview drafts cleared.';
                }
            });
        }
    }

    // 4b. Student Services Filtering & Rendering
    let activeServiceCategory = 'all';
    let serviceSearchQuery = '';

    function renderStudentServices() {
        const servicesContainer = document.getElementById('student-services-grid');
        if (!servicesContainer || !COLLEGE_DATA.studentServices) return;

        const isBangla = currentLang === 'bn';
        const filtered = COLLEGE_DATA.studentServices.filter(srv => {
            const matchesCat = activeServiceCategory === 'all' || srv.category === activeServiceCategory;
            const searchLower = serviceSearchQuery.toLowerCase();
            const titleMatch = (isBangla ? srv.titleBn : srv.titleEn).toLowerCase().includes(searchLower);
            const descMatch = (isBangla ? srv.descBn : srv.descEn).toLowerCase().includes(searchLower);
            const catMatch = (isBangla ? srv.categoryNameBn : srv.categoryNameEn).toLowerCase().includes(searchLower);
            const sourceMatch = (isBangla ? srv.officialSourceBn : srv.officialSource).toLowerCase().includes(searchLower);
            return matchesCat && (titleMatch || descMatch || catMatch || sourceMatch);
        });

        if (filtered.length === 0) {
            servicesContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
                    <i class="fas fa-search empty-icon" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 15px;" aria-hidden="true"></i>
                    <h3 style="color: var(--color-primary);">${isBangla ? 'কোনো শিক্ষার্থী সেবা পাওয়া যায়নি' : 'No Matching Services Found'}</h3>
                    <p style="color: var(--color-text-secondary);">${isBangla ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি বেছে নিন।' : 'Please try adjusting your search terms or filter tab.'}</p>
                </div>
            `;
            return;
        }

        servicesContainer.innerHTML = filtered.map(srv => {
            const title = isBangla ? srv.titleBn : srv.titleEn;
            const desc = isBangla ? srv.descBn : srv.descEn;
            const categoryName = isBangla ? srv.categoryNameBn : srv.categoryNameEn;
            const badgeText = isBangla ? srv.badgeTextBn : srv.badgeTextEn;
            const source = isBangla ? srv.officialSourceBn : srv.officialSource;
            const keyInfo = isBangla ? srv.keyInfoBn : srv.keyInfoEn;
            const btnText = srv.isExternal 
                ? (isBangla ? 'অফিসিয়াল পোর্টালে যান' : 'Visit Official Portal')
                : (isBangla ? 'বিস্তারিত ও তথ্য দেখুন' : 'View Details & Guide');
            const targetAttr = srv.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
            const btnClass = srv.badgeType === 'official' ? 'btn-service-action primary' : 'btn-service-action accent';

            return `
                <article class="quick-access-card" data-category="${srv.category}">
                    <div class="card-top-meta">
                        <div class="card-icon-bubble" aria-hidden="true">
                            <i class="fas ${srv.icon}"></i>
                        </div>
                        <span class="source-badge badge-${srv.badgeType}">${badgeText}</span>
                    </div>
                    <div style="margin-bottom: 6px;">
                        <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px;">${categoryName}</span>
                    </div>
                    <h3 class="quick-card-title">${title}</h3>
                    <p class="quick-card-desc">${desc}</p>
                    <div class="quick-card-highlight">
                        <i class="fas fa-info-circle" aria-hidden="true"></i> ${keyInfo}
                    </div>
                    <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 12px;">
                        <i class="fas fa-check-circle" aria-hidden="true"></i> <strong>${isBangla ? 'উৎস' : 'Source'}:</strong> ${source}
                    </div>
                    <div class="quick-card-action">
                        <a href="${srv.url}" class="${btnClass}" ${targetAttr}>
                            <span>${btnText}</span>
                            <i class="fas ${srv.isExternal ? 'fa-external-link-alt' : 'fa-arrow-right'}" aria-hidden="true"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }

    function setupServicesFilters() {
        const filterBtns = document.querySelectorAll('.services-filter-btn');
        const searchInput = document.getElementById('services-search-input');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeServiceCategory = btn.getAttribute('data-category') || 'all';
                renderStudentServices();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                serviceSearchQuery = e.target.value.trim();
                renderStudentServices();
            });
        }
    }

    // 5. Accordion (FAQs)
    function setupAccordions() {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isOpen = item.classList.contains('active');

                // Close others in same accordion
                const parent = item.parentElement;
                parent.querySelectorAll('.accordion-item').forEach(it => {
                    it.classList.remove('active');
                    it.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // 6. Contact Form Validation & State
    function setupContactForm() {
        const form = document.getElementById('contact-form');
        const feedback = document.getElementById('form-feedback');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('[name="name"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();
            const phone = form.querySelector('[name="phone"]').value.trim();
            const message = form.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                if (feedback) {
                    feedback.className = 'form-feedback error';
                    feedback.textContent = currentLang === 'bn' 
                        ? 'অনুগ্রহ করে সকল আবশ্যকীয় তথ্য সঠিকভাবে পূরণ করুন।' 
                        : 'Please fill in all required fields accurately.';
                }
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                form.reset();
                if (feedback) {
                    feedback.className = 'form-feedback success';
                    feedback.textContent = currentLang === 'bn'
                        ? 'ধন্যবাদ! আপনার বার্তাটি কলেজের প্রশাসনিক শাখার জন্য গৃহীত হয়েছে। দ্রুততম সময়ে উত্তর দেওয়া হবে।'
                        : 'Thank you! Your message has been received by the college administration. We will reply shortly.';
                }
            }, 700);
        });
    }

    // 7. Lightbox Modal for Gallery Images
    function setupImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-grid-item img, .honours-thumb-wrap img');
        if (!galleryItems.length) return;

        let modal = document.querySelector('.lightbox-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'lightbox-modal';
            modal.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close image">&times;</button>
                    <img src="" alt="Enlarged view" class="lightbox-img">
                    <p class="lightbox-caption"></p>
                </div>
            `;
            document.body.appendChild(modal);

            const overlay = modal.querySelector('.lightbox-overlay');
            const closeBtn = modal.querySelector('.lightbox-close');

            const closeModal = () => modal.classList.remove('open');
            overlay.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
            });
        }

        const modalImg = modal.querySelector('.lightbox-img');
        const modalCaption = modal.querySelector('.lightbox-caption');

        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalCaption.textContent = img.alt || '';
                modal.classList.add('open');
            });
        });
    }

    // =========================================================================
    // 5. Admin Portal: Authentication, Session Management & Notice CRUD
    // =========================================================================
    function setupAdminPortal() {
        const portalRoot = document.getElementById('admin-portal-root');
        if (!portalRoot) return;

        const loginView = document.getElementById('admin-login-view');
        const dashboardView = document.getElementById('admin-dashboard-view');
        const loginForm = document.getElementById('admin-login-form');
        const loginErrorMsg = document.getElementById('admin-login-error');
        const usernameInput = document.getElementById('admin-username');
        const passwordInput = document.getElementById('admin-password');
        const logoutBtn = document.getElementById('btn-admin-logout');

        // CRUD Form elements
        const noticeForm = document.getElementById('admin-manage-notice-form');
        const formHeading = document.getElementById('admin-form-heading');
        const editIdInput = document.getElementById('admin-notice-edit-id');
        const inputTitleBn = document.getElementById('admin-input-title-bn');
        const inputTitleEn = document.getElementById('admin-input-title-en');
        const inputCategory = document.getElementById('admin-input-category');
        const inputDate = document.getElementById('admin-input-date');
        const inputSummaryBn = document.getElementById('admin-input-summary-bn');
        const inputSummaryEn = document.getElementById('admin-input-summary-en');
        const inputLink = document.getElementById('admin-input-link');
        const inputFeatured = document.getElementById('admin-input-featured');
        const submitBtn = document.getElementById('admin-btn-submit-notice');
        const cancelBtn = document.getElementById('admin-btn-cancel-edit');
        const resetBtn = document.getElementById('admin-btn-reset-form');
        const formAlert = document.getElementById('admin-form-alert');

        // Table & Search elements
        const tableBody = document.getElementById('admin-notices-table-body');
        const emptyState = document.getElementById('admin-empty-state');
        const filterInput = document.getElementById('admin-filter-input');
        let adminTableSearch = '';
        const statTotal = document.getElementById('admin-stat-total-val');
        const statAdmin = document.getElementById('admin-stat-admin-val');
        const statNu = document.getElementById('admin-stat-nu-val');

        // Authentication state view switcher
        function renderAuthView() {
            const session = checkAdminSession();
            if (session) {
                if (loginView) loginView.style.display = 'none';
                if (dashboardView) dashboardView.style.display = 'block';
                renderAdminNoticesTable();
                updateDashboardStats();
            } else {
                if (loginView) loginView.style.display = 'block';
                if (dashboardView) dashboardView.style.display = 'none';
                if (usernameInput) usernameInput.focus();
            }
        }

        // Listen for back/forward navigation to enforce session state
        window.addEventListener('pageshow', () => {
            renderAuthView();
        });

        // Login Handler
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = usernameInput ? usernameInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';

                // Validate non-empty
                if (!username || !password) {
                    if (loginErrorMsg) {
                        loginErrorMsg.className = 'admin-alert error';
                        loginErrorMsg.style.display = 'flex';
                        loginErrorMsg.textContent = (currentLang === 'bn')
                            ? 'অনুগ্রহ করে ব্যবহারকারী নাম ও পাসওয়ার্ড প্রদান করুন।'
                            : 'Please enter both username and password.';
                    }
                    return;
                }

                // Check exact credentials requested: theemrandev / ESNLK619
                if (username === 'theemrandev' && password === 'ESNLK619') {
                    if (loginErrorMsg) loginErrorMsg.style.display = 'none';
                    setAdminSession();
                    if (passwordInput) passwordInput.value = '';
                    renderAuthView();
                } else {
                    if (loginErrorMsg) {
                        loginErrorMsg.className = 'admin-alert error';
                        loginErrorMsg.style.display = 'flex';
                        loginErrorMsg.textContent = (currentLang === 'bn')
                            ? 'ভুল ব্যবহারকারী নাম অথবা পাসওয়ার্ড। সঠিক তথ্য প্রদান করে পুনরায় চেষ্টা করুন।'
                            : 'Invalid username or password. Please verify your credentials and try again.';
                    }
                    if (passwordInput) {
                        passwordInput.value = '';
                        passwordInput.focus();
                    }
                }
            });
        }

        // Logout Handler
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                clearAdminSession();
                resetNoticeForm();
                window.history.replaceState(null, '', 'admin.html');
                renderAuthView();
                if (loginErrorMsg) {
                    loginErrorMsg.style.display = 'flex';
                    loginErrorMsg.className = 'admin-alert info';
                    loginErrorMsg.textContent = (currentLang === 'bn')
                        ? '✓ আপনি সফলভাবে অ্যাডমিন সেশন থেকে লগআউট করেছেন।'
                        : '✓ You have been logged out successfully.';
                }
            });
        }

        // Dashboard Stats
        function updateDashboardStats() {
            const adminNotices = getAdminNotices();
            const totalNotices = adminNotices.length + (COLLEGE_DATA.notices ? COLLEGE_DATA.notices.length : 0);
            if (statTotal) statTotal.textContent = totalNotices;
            if (statAdmin) statAdmin.textContent = adminNotices.length;
            if (statNu) {
                const isNuLive = Boolean(liveOfficialData && liveOfficialData.isLiveServer && liveOfficialData.isLive);
                statNu.textContent = isNuLive 
                    ? (currentLang === 'bn' ? 'সক্রিয় (লাইভ)' : 'Active (Live)')
                    : (currentLang === 'bn' ? 'সংরক্ষিত ক্যাশ' : 'Cached Snapshot');
            }
        }

        // Render Admin Table
        function renderAdminNoticesTable() {
            if (!tableBody) return;
            const isBangla = currentLang === 'bn';
            const notices = getAdminNotices();

            const filtered = notices.filter(n => {
                if (!adminTableSearch) return true;
                const searchLower = adminTableSearch.toLowerCase();
                const titleMatch = (n.titleBn || '').toLowerCase().includes(searchLower) || (n.titleEn || '').toLowerCase().includes(searchLower);
                const summaryMatch = (n.summaryBn || '').toLowerCase().includes(searchLower) || (n.summaryEn || '').toLowerCase().includes(searchLower);
                return titleMatch || summaryMatch;
            });

            if (filtered.length === 0) {
                tableBody.innerHTML = '';
                if (emptyState) emptyState.style.display = 'block';
                return;
            }

            if (emptyState) emptyState.style.display = 'none';

            tableBody.innerHTML = filtered.map(notice => {
                const title = isBangla ? (notice.titleBn || notice.titleEn) : (notice.titleEn || notice.titleBn);
                const summary = isBangla ? (notice.summaryBn || notice.summaryEn) : (notice.summaryEn || notice.summaryBn);
                const categoryName = isBangla ? (notice.categoryNameBn || notice.category) : (notice.categoryNameEn || notice.category);
                const safeCat = escapeHtml(notice.category || 'general');

                return `
                    <tr data-notice-id="${escapeHtml(notice.id)}">
                        <td style="font-family: monospace; font-size: 0.8rem; color: var(--color-text-muted);">
                            ${escapeHtml(notice.id)}
                            ${notice.featured ? '<br><span style="display:inline-block; font-size:0.7rem; background:#fef3c7; color:#92400e; padding:1px 6px; border-radius:4px; font-weight:700; margin-top:4px;">Featured</span>' : ''}
                        </td>
                        <td>
                            <strong style="color: var(--color-primary);">${escapeHtml(title)}</strong>
                            <p style="font-size: 0.82rem; color: var(--color-text-secondary); margin: 4px 0 0 0; line-height: 1.4;">${escapeHtml(summary)}</p>
                            ${notice.link ? `<div style="margin-top: 4px;"><a href="${sanitizeUrl(notice.link)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; color: var(--color-accent); text-decoration: underline;"><i class="fas fa-link"></i> ${escapeHtml(notice.link)}</a></div>` : ''}
                        </td>
                        <td>
                            <span class="notice-badge badge-${safeCat}">${escapeHtml(categoryName)}</span>
                        </td>
                        <td style="white-space: nowrap;">
                            ${escapeHtml(notice.date || '')}
                        </td>
                        <td style="white-space: nowrap;">
                            <div style="display: flex; gap: 6px;">
                                <button type="button" class="admin-action-btn edit" data-action="edit" data-id="${escapeHtml(notice.id)}" title="${isBangla ? 'সম্পাদনা করুন' : 'Edit Notice'}">
                                    <i class="fas fa-edit" aria-hidden="true"></i> <span>${isBangla ? 'সম্পাদনা' : 'Edit'}</span>
                                </button>
                                <button type="button" class="admin-action-btn delete" data-action="delete" data-id="${escapeHtml(notice.id)}" title="${isBangla ? 'মুছে ফেলুন' : 'Delete Notice'}">
                                    <i class="fas fa-trash-alt" aria-hidden="true"></i> <span>${isBangla ? 'ডিলিট' : 'Delete'}</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Table Action Delegation (Edit & Delete)
        if (tableBody) {
            tableBody.addEventListener('click', (e) => {
                const btn = e.target.closest('.admin-action-btn');
                if (!btn) return;
                const action = btn.getAttribute('data-action');
                const id = btn.getAttribute('data-id');
                if (!id) return;

                if (action === 'edit') {
                    loadNoticeForEdit(id);
                } else if (action === 'delete') {
                    confirmAndDeleteNotice(id);
                }
            });
        }

        // Search Filter on Admin Table
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                adminTableSearch = e.target.value.trim();
                renderAdminNoticesTable();
            });
        }

        // Load Notice into Form for Editing
        function loadNoticeForEdit(id) {
            const notices = getAdminNotices();
            const notice = notices.find(n => n.id === id);
            if (!notice) return;

            if (editIdInput) editIdInput.value = notice.id;
            if (inputTitleBn) inputTitleBn.value = notice.titleBn || '';
            if (inputTitleEn) inputTitleEn.value = notice.titleEn || '';
            if (inputCategory) inputCategory.value = notice.category || 'general';
            if (inputDate) inputDate.value = notice.date || '';
            if (inputSummaryBn) inputSummaryBn.value = notice.summaryBn || '';
            if (inputSummaryEn) inputSummaryEn.value = notice.summaryEn || '';
            if (inputLink) inputLink.value = (notice.link && notice.link !== 'notice.html') ? notice.link : '';
            if (inputFeatured) inputFeatured.checked = Boolean(notice.featured);

            if (formHeading) {
                formHeading.textContent = (currentLang === 'bn')
                    ? `নোটিশ সম্পাদনা (ID: ${notice.id})`
                    : `Edit Notice (ID: ${notice.id})`;
            }

            if (submitBtn) {
                submitBtn.innerHTML = `<i class="fas fa-save" aria-hidden="true"></i> <span>${currentLang === 'bn' ? 'আপডেট সংরক্ষণ করুন' : 'Update Notice'}</span>`;
            }

            if (cancelBtn) cancelBtn.style.display = 'inline-flex';

            // Scroll form into view
            if (noticeForm) {
                noticeForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (inputTitleBn) inputTitleBn.focus();
            }

            showFormAlert('info', (currentLang === 'bn')
                ? `ℹ নোটিশ '${notice.titleBn || notice.titleEn}' সম্পাদনা মোডে লোড করা হয়েছে।`
                : `ℹ Notice '${notice.titleEn || notice.titleBn}' loaded in edit mode.`);
        }

        // Reset form to Create mode
        function resetNoticeForm() {
            if (noticeForm) noticeForm.reset();
            if (editIdInput) editIdInput.value = '';
            if (inputDate) inputDate.value = new Date().toISOString().split('T')[0];

            if (formHeading) {
                formHeading.textContent = (currentLang === 'bn')
                    ? 'নতুন প্রাতিষ্ঠানিক নোটিশ প্রকাশ করুন'
                    : 'Create & Publish Institutional Notice';
            }

            if (submitBtn) {
                submitBtn.innerHTML = `<i class="fas fa-paper-plane" aria-hidden="true"></i> <span>${currentLang === 'bn' ? 'সংরক্ষণ ও প্রকাশ করুন' : 'Save & Publish Notice'}</span>`;
            }

            if (cancelBtn) cancelBtn.style.display = 'none';
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                resetNoticeForm();
                showFormAlert('info', (currentLang === 'bn')
                    ? 'সম্পাদনা বাতিল করা হয়েছে।'
                    : 'Edit operation cancelled without changes.');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                resetNoticeForm();
                if (formAlert) formAlert.style.display = 'none';
            });
        }

        // Form Submit Handler (Handles both Create and Update)
        if (noticeForm) {
            noticeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const isBangla = currentLang === 'bn';

                const editId = editIdInput ? editIdInput.value.trim() : '';
                const titleBn = inputTitleBn ? inputTitleBn.value.trim() : '';
                const titleEn = inputTitleEn ? inputTitleEn.value.trim() : '';
                const category = inputCategory ? inputCategory.value : 'general';
                const date = (inputDate && inputDate.value) ? inputDate.value : new Date().toISOString().split('T')[0];
                const summaryBn = inputSummaryBn ? inputSummaryBn.value.trim() : '';
                const summaryEn = inputSummaryEn ? inputSummaryEn.value.trim() : '';
                const link = (inputLink && inputLink.value.trim()) ? inputLink.value.trim() : 'notice.html';
                const featured = inputFeatured ? inputFeatured.checked : false;

                // Validate required fields
                if (!titleBn || !titleEn || !summaryBn || !summaryEn) {
                    showFormAlert('error', isBangla
                        ? 'অনুগ্রহ করে বাংলা ও ইংরেজি উভয় শিরোনাম এবং সারসংক্ষেপ প্রদান করুন।'
                        : 'Please provide both Bengali and English titles and summaries.');
                    return;
                }

                const catMapBn = { exam: 'পরীক্ষা', routine: 'রুটিন', admission: 'ভর্তি', general: 'সাধারণ', achievement: 'অর্জন' };
                const catMapEn = { exam: 'Examination', routine: 'Routine', admission: 'Admission', general: 'General', achievement: 'Achievement' };

                const noticePayload = {
                    titleBn,
                    titleEn,
                    category,
                    categoryNameBn: catMapBn[category] || 'সাধারণ',
                    categoryNameEn: catMapEn[category] || 'General',
                    date,
                    summaryBn,
                    summaryEn,
                    link,
                    isExternal: link.startsWith('http'),
                    featured,
                    source: "Principal's Office, NADC"
                };

                try {
                    if (editId) {
                        // UPDATE MODE
                        updateAdminNotice(editId, noticePayload);
                        showFormAlert('success', isBangla
                            ? `✓ নোটিশটি (ID: ${editId}) সফলভাবে আপডেট করা হয়েছে!`
                            : `✓ Notice (ID: ${editId}) updated successfully!`);
                    } else {
                        // CREATE MODE
                        const created = addAdminNotice(noticePayload);
                        showFormAlert('success', isBangla
                            ? `✓ নতুন নোটিশ (ID: ${created.id}) সফলভাবে প্রকাশিত ও সংরক্ষিত হয়েছে!`
                            : `✓ New notice (ID: ${created.id}) published and saved successfully!`);
                    }

                    resetNoticeForm();
                    renderAdminNoticesTable();
                    updateDashboardStats();
                    renderNotices(); // Update public notice views
                } catch (err) {
                    showFormAlert('error', isBangla
                        ? `ত্রুটি: নোটিশ সংরক্ষণ করা সম্ভব হয়নি (${err.message})`
                        : `Error: Unable to save notice (${err.message})`);
                }
            });
        }

        // Delete with Confirmation
        function confirmAndDeleteNotice(id) {
            const notices = getAdminNotices();
            const notice = notices.find(n => n.id === id);
            const noticeTitle = notice ? (currentLang === 'bn' ? (notice.titleBn || notice.titleEn) : (notice.titleEn || notice.titleBn)) : id;

            const confirmMsg = (currentLang === 'bn')
                ? `আপনি কি নিশ্চিতভাবে এই নোটিশটি মুছে ফেলতে চান?\n\n"${noticeTitle}"\n(আইডি: ${id})\n\nমুছে ফেলার পর এটি ওয়েবসাইট ও লোকালস্টোরেজ থেকে স্থায়ীভাবে অপসারিত হবে।`
                : `Are you sure you want to delete this notice?\n\n"${noticeTitle}"\n(ID: ${id})\n\nThis will permanently remove it from the website and storage.`;

            if (window.confirm(confirmMsg)) {
                try {
                    const deleted = deleteAdminNotice(id);
                    if (deleted) {
                        if (editIdInput && editIdInput.value === id) {
                            resetNoticeForm();
                        }
                        renderAdminNoticesTable();
                        updateDashboardStats();
                        renderNotices(); // Update public board
                        showFormAlert('success', (currentLang === 'bn')
                            ? `✓ নোটিশটি (ID: ${id}) সফলভাবে মুছে ফেলা হয়েছে।`
                            : `✓ Notice (ID: ${id}) deleted successfully.`);
                    }
                } catch (err) {
                    showFormAlert('error', `Delete error: ${err.message}`);
                }
            }
        }

        function showFormAlert(type, message) {
            if (!formAlert) return;
            formAlert.className = `admin-alert ${type}`;
            formAlert.style.display = 'flex';
            formAlert.textContent = message;
        }

        // Default date on load
        if (inputDate && !inputDate.value) {
            inputDate.value = new Date().toISOString().split('T')[0];
        }

        // Initialize authentication view and render table once all handlers are established
        renderAuthView();
    }

    // Storage Event Listener for multi-tab synchronization
    window.addEventListener('storage', (e) => {
        if (e.key === ADMIN_NOTICES_STORAGE_KEY) {
            renderNotices();
            const portalRoot = document.getElementById('admin-portal-root');
            if (portalRoot) {
                setupAdminPortal();
            }
        }
    });

    // Initialize all functionality on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        setupFeedTabs();
        setupAdminNoticePublisher();
        setupAdminPortal();
        loadOfficialNoticesData();
        applyLanguage(currentLang);
        highlightActiveNav();
        setupMobileNav();
        setupNoticeFilters();
        setupServicesFilters();
        setupAccordions();
        setupContactForm();
        setupImageModal();
    });

})();

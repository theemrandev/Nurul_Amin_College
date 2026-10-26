import React from "react";

export interface TechLogoProps {
  className?: string;
  size?: number;
}

/**
 * High-fidelity, authentic technology logos with official brand colors
 * Rendered as crisp, resolution-independent vector SVGs.
 */

// 1. HTML5
export function Html5Logo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#E34F26" />
      <path d="M12 3.8v16.3l5.6-1.9 1.4-14.4H12z" fill="#EF652A" />
      <path d="M12 8.3H8l.2 2.2h3.8v2.2H8.3l.3 3.3L12 17l3.4-1 .4-4.5H9.9" fill="#fff" />
      <path d="M12 6.1H7.8l.1 1.1h4.1V6.1zm0 7.2v2.2l2.3-.7.2-2.6H12v1.1z" fill="#EBEBEB" />
      <path d="M12 6.1v2.2h4.2l-.2 2.2H12v2.2h3.8l-.4 4.5L12 18.2V8.3h4.3l.1-2.2H12z" fill="#fff" />
    </svg>
  );
}

// 2. CSS3
export function Css3Logo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#1572B6" />
      <path d="M12 3.8v16.3l5.6-1.9 1.4-14.4H12z" fill="#33A9DC" />
      <path d="M12 8.2h-3.8l.2 2.2H12v2.2H8.4l.3 3.3L12 17l3.4-1 .4-4.5H12v-1.1h4l.2-2.2H12V8.2z" fill="#fff" />
      <path d="M12 6.1H7.8l.1 1.1h4.1V6.1z" fill="#EBEBEB" />
      <path d="M12 6.1v2.1h4.2l.2-2.1H12zm0 6.6v2.2l2.3-.7.2-2.6H12v1.1z" fill="#fff" />
    </svg>
  );
}

// 3. JavaScript
export function JavascriptLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.5 18.5l1.8-1.1c.4.7.7 1.3 1.5 1.3.8 0 1.3-.3 1.3-1.4v-6.7h2.2v6.8c0 2.2-1.3 3.3-3.4 3.3-1.8 0-3-1-3.4-2.2zm8.3-.3l1.8-1c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.8 0-1.9 1.5-3.3 3.8-3.3 1.7 0 2.9.6 3.7 2.1l-1.7 1.1c-.4-.7-.8-1-1.9-1-1 0-1.5.5-1.5 1.1 0 .7.5 1 1.7 1.5l.7.3c2.2.9 3.4 1.9 3.4 4 0 2.3-1.8 3.5-4.1 3.5-2.3 0-3.7-1.1-4.3-2.5z"
        fill="#000"
      />
    </svg>
  );
}

// 4. TypeScript
export function TypescriptLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M4.5 10.5h6v1.8H8.6v7.2H6.4v-7.2H4.5v-1.8zm10.3 5.4c.5.4 1.2.7 2 .7.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.5-1.2l-.6-.2c-1.7-.7-2.6-1.5-2.6-2.9 0-1.6 1.3-2.7 3.2-2.7 1.4 0 2.4.4 3.1 1.1l-1.1 1.5c-.5-.4-1.2-.7-1.9-.7-.7 0-1.1.3-1.1.7 0 .5.4.7 1.4 1.1l.6.2c1.8.7 2.7 1.6 2.7 3 0 1.7-1.3 2.8-3.5 2.8-1.6 0-2.8-.5-3.6-1.4l1.6-1.6z"
        fill="#fff"
      />
    </svg>
  );
}

// 5. React.js
export function ReactLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

// 6. Next.js
export function NextjsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" className="text-neutral-900 dark:text-neutral-100" />
      <path
        d="M7.8 7.5h1.9v9H7.8v-9zm8.4 0H14L10 14.8v1.7h1.6l4.6-7V7.5zm-1.8 9h1.8v-4.8l-1.8 2.6v2.2z"
        fill="currentColor"
        className="text-white dark:text-neutral-950"
      />
    </svg>
  );
}

// 7. Tailwind CSS
export function TailwindLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.3 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8C16.9 7.6 15.3 6 12 6zM6.6 12.5C3.6 12.5 1.8 14 1.2 17c1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.3 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.3-3z"
        fill="#06B6D4"
      />
    </svg>
  );
}

// 8. Bootstrap
export function BootstrapLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#7952B3" />
      <path
        d="M7 6h5.2c1.7 0 3 .5 3.7 1.4.7.9.6 2.1-.2 2.8 1.1.6 1.7 1.8 1.5 3.1-.2 1.4-1.3 2.7-3.4 2.7H7V6zm3.3 3.9h1.7c.9 0 1.6-.3 1.6-1 0-.7-.6-1-1.6-1h-1.7v2zm0 4.1h2c1 0 1.8-.4 1.8-1.2 0-.8-.7-1.2-1.8-1.2h-2v2.4z"
        fill="#fff"
      />
    </svg>
  );
}

// 9. jQuery
export function JqueryLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0769AD" />
      <path
        d="M19 12c0 3.9-3.1 7-7 7-1.8 0-3.5-.7-4.8-1.9l1.5-1.5c.9.9 2.1 1.4 3.3 1.4 2.8 0 5-2.2 5-5s-2.2-5-5-5c-2.4 0-4.4 1.7-4.9 4h2.9l-3.5 4.5L3 11h2.9c.5-3.3 3.4-6 6.9-6 3.9 0 7 3.1 7 7z"
        fill="#fff"
      />
    </svg>
  );
}

// 10. Redux
export function ReduxLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M16.5 13.5c-.8 0-1.5.3-2 .8l-4.7-2.7c.1-.4.2-.7.2-1.1s-.1-.8-.2-1.1l4.7-2.7c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .4.1.7.2 1.1L9 8.3C8.5 7.8 7.8 7.5 7 7.5c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l4.7 2.7c-.1.4-.2.7-.2 1.1 0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3z"
        fill="#764ABC"
      />
    </svg>
  );
}

// 11. Zustand
export function ZustandLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#443E38" />
      <circle cx="8" cy="8" r="2.5" fill="#E88C30" />
      <circle cx="16" cy="8" r="2.5" fill="#E88C30" />
      <circle cx="12" cy="13.5" r="5.5" fill="#E88C30" />
      <circle cx="10" cy="12.5" r="1" fill="#443E38" />
      <circle cx="14" cy="12.5" r="1" fill="#443E38" />
      <ellipse cx="12" cy="15.2" rx="2" ry="1.2" fill="#fff" />
      <circle cx="12" cy="14.8" r="0.7" fill="#443E38" />
    </svg>
  );
}

// 12. Git
export function GitLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4 12 6.6c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.5 2.5c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.3-.5-1.9l-2.3-2.3v5.1c.2.2.4.4.5.7.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.7-.7-.7-1.8 0-2.5.3-.3.7-.5 1.1-.6V8.6c-.4-.1-.8-.3-1.1-.6-.5-.5-.7-1.3-.5-1.9L8.3 5.1 2.4 11c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.6.6-1.5 0-2.1z"
        fill="#F05032"
      />
    </svg>
  );
}

// 13. GitHub
export function GithubLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// 14. Figma
export function FigmaLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#F24E1E" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="#1ABCFE" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="#0ACF83" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#A259FF" />
    </svg>
  );
}

// 15. Vite Bundler
export function ViteLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M21.5 3.5L12.7 20.8a.9.9 0 0 1-1.5 0L2.5 3.5a.8.8 0 0 1 .9-1.2l8.6 1.7 8.6-1.7a.8.8 0 0 1 .9 1.2z"
        fill="url(#viteGradient)"
      />
      <path d="M13.2 2.5l-6.8 12.2h4.5l-1.8 6.8 7.8-13h-4.3l1.8-6h-1.2z" fill="#FFD62E" />
      <defs>
        <linearGradient id="viteGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 16. Node.js
export function NodejsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z"
        fill="#333"
        stroke="#5FA04E"
        strokeWidth="1.5"
      />
      <path
        d="M12 5.5l5.5 3.2v6.4L12 18.3l-5.5-3.2V8.7L12 5.5z"
        fill="#5FA04E"
      />
      <path
        d="M12 8.5a3.5 3.5 0 1 1-3.5 3.5c0-.9.3-1.7.9-2.3L12 12l2.6-2.3c-.6-.7-1.6-1.2-2.6-1.2z"
        fill="#fff"
      />
    </svg>
  );
}

// 17. Express.js
export function ExpressLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="currentColor" className="text-neutral-900 dark:text-neutral-100" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="12"
        fill="currentColor"
        className="text-white dark:text-neutral-950"
      >
        ex
      </text>
    </svg>
  );
}

// 18. REST APIs
export function RestApiLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#059669" />
      <path
        d="M6 12h12M6 8h4M14 16h4M7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-5 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-5 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 19. MongoDB
export function MongodbLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2C11.5 3.5 7 9.5 7 14c0 3.8 2.6 6.8 5 7.8 2.4-1 5-4 5-7.8 0-4.5-4.5-10.5-5-12z"
        fill="#47A248"
      />
      <path
        d="M12 2v19.8c2.4-1 5-4 5-7.8 0-4.5-4.5-10.5-5-12z"
        fill="#499D4A"
      />
      <path d="M12 4.5c.2 1.3 1.2 5 1.2 8.5 0 2.2-.6 4.3-1.2 5.5V4.5z" fill="#fff" opacity="0.4" />
    </svg>
  );
}

// 20. Mongoose
export function MongooseLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#880000" />
      <path
        d="M6 8c2-2 5-2 7 0l2 2c1.5-1 3.5-1 4.5.5s.5 3.5-.5 4.5l-4 4c-2 2-5 2-7 0l-2-2C4.5 16 4.5 14 5 12.5L6 8z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="10" r="1.2" fill="#fff" />
    </svg>
  );
}

// 21. PostgreSQL
export function PostgresqlLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#336791" />
      <path
        d="M12 4.5C8 4.5 6 7 6 10.5c0 2.5 1.5 4.5 3.5 5.5v3.5h2v-3c.8.2 1.6.2 2.5 0v3h2v-3.5c2-1 3.5-3 3.5-5.5 0-3.5-2-6-7.5-6zm-2.5 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        fill="#fff"
      />
    </svg>
  );
}

// 22. Prisma
export function PrismaLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#2D3748" />
      <path d="M12 3l8 15.5H4L12 3z" fill="#16A394" />
      <path d="M12 3l8 15.5h-8V3z" fill="#0EA5E9" opacity="0.8" />
      <path d="M12 3v15.5l-5-4L12 3z" fill="#fff" opacity="0.3" />
    </svg>
  );
}

// 23. Redis
export function RedisLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2z" fill="#DC382D" />
      <path d="M12 2v20l9-4.5v-11L12 2z" fill="#B92D24" />
      <path d="M12 5.5l5.5 2.8-5.5 2.7-5.5-2.7L12 5.5z" fill="#fff" opacity="0.9" />
      <path d="M12 11l5.5 2.8-5.5 2.7-5.5-2.7L12 11z" fill="#fff" opacity="0.7" />
    </svg>
  );
}

// 24. JWT
export function JwtLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#000" />
      <circle cx="7" cy="12" r="3" fill="#D63AFF" />
      <circle cx="12" cy="12" r="3" fill="#00B9F1" />
      <circle cx="17" cy="12" r="3" fill="#FB015B" />
      <path d="M7 12h10" stroke="#fff" strokeWidth="1" strokeDasharray="1 1" />
    </svg>
  );
}

// 25. Role-Based Access Control (RBAC)
export function RbacLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#E11D48" />
      <circle cx="12" cy="8" r="3" stroke="#fff" strokeWidth="1.5" />
      <path d="M6 18c0-3 3-4.5 6-4.5s6 1.5 6 4.5" stroke="#fff" strokeWidth="1.5" />
      <path d="M16 11l2 2 3-3" stroke="#FFD62E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 26. Postman
export function PostmanLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#FF6C37" />
      <path
        d="M17.5 7.5L5 13l4.5 1.5L14 10l-3.5 5.5 5 1.5 2-9.5z"
        fill="#fff"
      />
    </svg>
  );
}

// 27. Swagger
export function SwaggerLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#85EA2D" />
      <path
        d="M8.5 8C7.5 8 7 9 7 10v4c0 1 .5 2 1.5 2m7-8c1 0 1.5 1 1.5 2v4c0 1-.5 2-1.5 2"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 28. Linux
export function LinuxLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#18181B" />
      <ellipse cx="12" cy="13" rx="5" ry="6.5" fill="#fff" />
      <ellipse cx="12" cy="7" rx="3.5" ry="4" fill="#000" />
      <circle cx="10.8" cy="6.5" r="0.8" fill="#fff" />
      <circle cx="13.2" cy="6.5" r="0.8" fill="#fff" />
      <polygon points="10,8 14,8 12,10.5" fill="#FCC624" />
      <ellipse cx="8" cy="19" rx="2.5" ry="1.2" fill="#FCC624" />
      <ellipse cx="16" cy="19" rx="2.5" ry="1.2" fill="#FCC624" />
      <ellipse cx="7" cy="14" rx="1.5" ry="3.5" fill="#000" transform="rotate(15 7 14)" />
      <ellipse cx="17" cy="14" rx="1.5" ry="3.5" fill="#000" transform="rotate(-15 17 14)" />
    </svg>
  );
}

// 29. Bash
export function BashLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#293138" />
      <path d="M6 8l4 4-4 4" stroke="#4EAA25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="18" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 30. Python
export function PythonLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M11.9 2c-3.1 0-5 .6-5 2.5v2.2h5v.6H5c-2 0-3.8 1.2-3.8 3.5 0 2.2 1.5 3.5 3.5 3.5h1.6v-2.2c0-1.8 1.5-3.2 3.3-3.2h4.8V6.5c0-2-1.9-4.5-5-4.5zm-1.6 1.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22c3.1 0 5-.6 5-2.5v-2.2h-5v-.6h6.9c2 0 3.8-1.2 3.8-3.5 0-2.2-1.5-3.5-3.5-3.5h-1.6v2.2c0 1.8-1.5 3.2-3.3 3.2H9.6v2.4c0 2 1.9 4.5 5 4.5zm1.6-1.6a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
        fill="#FFD43B"
      />
    </svg>
  );
}

// 31. Docker
export function DockerLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#2496ED" />
      <path
        d="M3 13.5c1 0 2-.5 3-1.5 1 1 2 1.5 3 1.5s2-.5 3-1.5c1 1 2 1.5 3 1.5s2-.5 3-1.5c1.5 1 3 1 4 0-1 4-4 6.5-9 6.5-5.5 0-8.5-3-9-6.5zm4-6.5h2v2H7V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-6 3h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z"
        fill="#fff"
      />
    </svg>
  );
}

// 32. Docker Compose
export function DockerComposeLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1D63ED" />
      <rect x="4" y="5" width="6" height="5" rx="1" fill="#fff" />
      <rect x="14" y="5" width="6" height="5" rx="1" fill="#fff" opacity="0.8" />
      <rect x="9" y="14" width="6" height="5" rx="1" fill="#fff" />
      <path d="M7 10v2h5v2M17 10v2h-5" stroke="#FFD62E" strokeWidth="1.5" />
    </svg>
  );
}

// 33. GitHub Actions
export function GithubActionsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#2088FF" />
      <circle cx="7" cy="12" r="2.5" fill="#fff" />
      <circle cx="17" cy="7" r="2.5" fill="#fff" />
      <circle cx="17" cy="17" r="2.5" fill="#fff" />
      <path d="M9.5 12h3m2-3l-2 3 2 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 34. AWS
export function AwsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#232F3E" />
      <path
        d="M6 12.5l2-5h1.2l2 5H10l-.4-1.2H8.4L8 12.5H6zm2.7-2.2h1L9.2 8.7 8.7 10.3zm4.5 2.2l-1.5-5h1.2l1 3.8 1-3.8h1.2l1 3.8 1-3.8h1.2l-1.6 5h-1.2l-1-3.8-1 3.8h-1.3z"
        fill="#fff"
      />
      <path
        d="M5 16.5c4 2 9.5 2 13.5-1l-1-.7c-3.5 2.5-8 2.5-11.5.8l-1 .9z"
        fill="#FF9900"
      />
      <polygon points="18.5,14.5 20,16 17.5,16.5" fill="#FF9900" />
    </svg>
  );
}

// 35. Terraform
export function TerraformLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1C1829" />
      <path d="M8.5 7.5L12 9.5v4.5l-3.5-2V7.5z" fill="#7B42BC" />
      <path d="M12.5 9.5L16 7.5v4.5l-3.5 2V9.5z" fill="#844FBA" />
      <path d="M8.5 12.5L12 14.5v4.5l-3.5-2v-4.5z" fill="#5C4EE5" />
      <path d="M5 5.5L8 7.5v4.5l-3-2V5.5z" fill="#5C4EE5" />
    </svg>
  );
}

// 36. Ansible
export function AnsibleLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#EE0000" />
      <path
        d="M12 4.5L6.5 18h2.3l1.8-4.5h4.8l.8 2.2c.4 1.1 1.2 2.3 2.6 2.3H20L12 4.5zm-.4 3.5l2 5.5H10.4l1.2-5.5z"
        fill="#fff"
      />
    </svg>
  );
}

// 37. Kubernetes
export function KubernetesLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#326CE5" />
      <path
        d="M12 4.5l6.5 3.7v7.6L12 19.5l-6.5-3.7V8.2L12 4.5z"
        stroke="#fff"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="12" cy="12" r="2.5" fill="#fff" />
      <line x1="12" y1="4.5" x2="12" y2="9.5" stroke="#fff" strokeWidth="1.2" />
      <line x1="18.5" y1="8.2" x2="14" y2="10.8" stroke="#fff" strokeWidth="1.2" />
      <line x1="18.5" y1="15.8" x2="14" y2="13.2" stroke="#fff" strokeWidth="1.2" />
      <line x1="12" y1="19.5" x2="12" y2="14.5" stroke="#fff" strokeWidth="1.2" />
      <line x1="5.5" y1="15.8" x2="10" y2="13.2" stroke="#fff" strokeWidth="1.2" />
      <line x1="5.5" y1="8.2" x2="10" y2="10.8" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

// 38. Helm
export function HelmLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0F1689" />
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="#277A9F" stroke="#fff" strokeWidth="1" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="5" x2="19" y2="19" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="19" x2="19" y2="5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 39. CI/CD Pipelines
export function CicdLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0284C7" />
      <path
        d="M7 12a4 4 0 1 1 5 3.8v-1.6A2.4 2.4 0 1 0 8.6 12H7zm10 0a4 4 0 1 1-5-3.8v1.6a2.4 2.4 0 1 0 3.4 2.2H17z"
        fill="#fff"
      />
      <circle cx="7" cy="12" r="1.5" fill="#FFD62E" />
      <circle cx="17" cy="12" r="1.5" fill="#10B981" />
    </svg>
  );
}

// 40. DevSecOps
export function DevSecOpsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#D97706" />
      <path d="M12 4l7 3.5v5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5v-5L12 4z" fill="#fff" opacity="0.9" />
      <path d="M12 9a2 2 0 0 0-2 2v1h-.5a.5.5 0 0 0-.5.5v3c0 .3.2.5.5.5h5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H14v-1a2 2 0 0 0-2-2zm1 3h-2v-1a1 1 0 0 1 2 0v1z" fill="#D97706" />
    </svg>
  );
}

// 41. Observability & Monitoring
export function ObservabilityLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#8B5CF6" />
      <path d="M4 14h3l2.5-6 4 10 3-6h3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="6" r="2" fill="#34D399" />
    </svg>
  );
}

// 42. LLMs
export function LlmsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#7C3AED" />
      <path d="M12 4l1.5 4.5L18 10l-4.5 1.5L12 16l-1.5-4.5L6 10l4.5-1.5L12 4z" fill="#fff" />
      <circle cx="6" cy="18" r="1.5" fill="#F472B6" />
      <circle cx="18" cy="18" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

// 43. Prompt Engineering
export function PromptEngineeringLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#EC4899" />
      <path d="M5 6h14v10H5V6z" stroke="#fff" strokeWidth="1.5" rx="1" />
      <path d="M8 10l2 2-2 2M12 14h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#FDE047" />
    </svg>
  );
}

// 44. Tool Calling & Function Calling
export function ToolCallingLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#2563EB" />
      <path d="M7 8l-3 4 3 4M17 8l3 4-3 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 45. RAG
export function RagLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0891B2" />
      <rect x="5" y="6" width="6" height="8" rx="1" fill="#fff" opacity="0.9" />
      <circle cx="16" cy="15" r="4" stroke="#fff" strokeWidth="1.8" />
      <line x1="19" y1="18" x2="21" y2="20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 14v4h3" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 46. Vector Databases & Embeddings
export function VectorDbLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#059669" />
      <circle cx="6" cy="6" r="2" fill="#fff" />
      <circle cx="18" cy="7" r="2" fill="#fff" />
      <circle cx="12" cy="12" r="2.5" fill="#FDE047" />
      <circle cx="7" cy="18" r="2" fill="#fff" />
      <circle cx="18" cy="17" r="2" fill="#fff" />
      <path d="M6 6l6 6m0 0l6-5m-6 5l-5 6m5-6l6 5" stroke="#fff" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

// 47. Agentic AI
export function AgenticAiLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#EA580C" />
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="#fff" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#FED7AA" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="7" r="1.5" fill="#FDE047" />
    </svg>
  );
}

// 48. LangGraph
export function LangGraphLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1E293B" />
      <circle cx="6" cy="12" r="2.5" fill="#38BDF8" />
      <circle cx="18" cy="7" r="2.5" fill="#34D399" />
      <circle cx="18" cy="17" r="2.5" fill="#F472B6" />
      <path d="M8.5 12h4m2.5-3.5L13 11m2 3.5L13 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 49. Multi-Agent Systems
export function MultiAgentLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#6D28D9" />
      <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="3" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="3" stroke="#FDE047" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="14" y2="10" stroke="#fff" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="9" y1="11" x2="11" y2="14" stroke="#fff" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="15" y1="11" x2="13" y2="14" stroke="#fff" strokeWidth="1" strokeDasharray="1 1" />
    </svg>
  );
}

// 50. Model Context Protocol (MCP)
export function McpLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0369A1" />
      <rect x="5" y="8" width="5" height="8" rx="1.5" fill="#fff" />
      <rect x="14" y="8" width="5" height="8" rx="1.5" fill="#38BDF8" />
      <path d="M10 10h4M10 14h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 51. Generative UI
export function GenerativeUiLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#BE185D" />
      <rect x="5" y="6" width="14" height="12" rx="2" stroke="#fff" strokeWidth="1.5" />
      <rect x="7" y="8" width="4" height="3" rx="0.5" fill="#F472B6" />
      <line x1="13" y1="9" x2="17" y2="9" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="11" x2="15" y2="11" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="7" y="13" width="10" height="3" rx="0.5" fill="#fff" opacity="0.8" />
    </svg>
  );
}

// 52. AI Observability
export function AiObservabilityLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#047857" />
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="#fff" />
    </svg>
  );
}

// 53. Human-in-the-Loop AI
export function HitlLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#C2410C" />
      <circle cx="9" cy="9" r="3" stroke="#fff" strokeWidth="1.5" />
      <path d="M4 17c0-2.5 2.5-4 5-4s5 1.5 5 4" stroke="#fff" strokeWidth="1.5" />
      <path d="M15 11l2 2 4-4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 54. Responsive Layouts
export function ResponsiveLayoutsLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#2563EB" />
      <rect x="4" y="6" width="10" height="8" rx="1" stroke="#fff" strokeWidth="1.5" />
      <rect x="13" y="10" width="7" height="9" rx="1" stroke="#FDE047" strokeWidth="1.5" fill="#2563EB" />
    </svg>
  );
}

// 55. Figma to Pixel UI
export function PixelUiLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#DB2777" />
      <path d="M6 18L14 6l4 4L10 22H6v-4z" fill="#fff" />
      <circle cx="14" cy="6" r="1" fill="#DB2777" />
    </svg>
  );
}

// 56. Async Data Fetching
export function AsyncDataLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#4F46E5" />
      <path d="M7 8l-3 4 3 4M17 16l3-4-3-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6l-4 12" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// 57. State Architecture
export function StateArchitectureLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#7C3AED" />
      <rect x="9" y="4" width="6" height="4" rx="1" fill="#fff" />
      <rect x="4" y="15" width="6" height="4" rx="1" fill="#A78BFA" />
      <rect x="14" y="15" width="6" height="4" rx="1" fill="#A78BFA" />
      <path d="M12 8v4M7 15v-3h10v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 58. VS Code & Debugging
export function VsCodeLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#007ACC" />
      <path
        d="M18.5 4.5L13 9.5 8 5.5l-2.5 2L10 12l-4.5 4.5 2.5 2 5-4 5.5 5 3-1.5v-12l-3-1.5zm0 12L14 12l4.5-4.5v9z"
        fill="#fff"
      />
    </svg>
  );
}

// 59. npm / Tooling
export function NpmLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#CB3837" />
      <path d="M5 8h14v8H12v-5H9.5v5H5V8zm4.5 3h2.5v2H9.5v-2z" fill="#fff" />
    </svg>
  );
}

// 60. Performance Profiling
export function PerformanceLogo({ className = "size-7" }: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#D97706" />
      <circle cx="12" cy="13" r="7" stroke="#fff" strokeWidth="1.5" />
      <path d="M12 13l3.5-3.5" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.5" fill="#fff" />
    </svg>
  );
}

/**
 * Universal TechLogo component that safely maps any technology or skill name
 * to its official recognizable SVG logo.
 */
export function TechLogo({
  name,
  className = "size-7",
}: {
  name: string;
  className?: string;
}) {
  const normalized = name.toLowerCase().trim();

  // Frontend
  if (normalized.includes("html")) return <Html5Logo className={className} />;
  if (normalized.includes("css")) return <Css3Logo className={className} />;
  if (normalized.includes("typescript")) return <TypescriptLogo className={className} />;
  if (normalized.includes("javascript")) return <JavascriptLogo className={className} />;
  if (normalized.includes("react")) return <ReactLogo className={className} />;
  if (normalized.includes("next")) return <NextjsLogo className={className} />;
  if (normalized.includes("tailwind")) return <TailwindLogo className={className} />;
  if (normalized.includes("bootstrap")) return <BootstrapLogo className={className} />;
  if (normalized.includes("jquery")) return <JqueryLogo className={className} />;
  if (normalized.includes("redux")) return <ReduxLogo className={className} />;
  if (normalized.includes("zustand")) return <ZustandLogo className={className} />;
  if (normalized === "git" || normalized.startsWith("git &")) return <GitLogo className={className} />;
  if (normalized.includes("github actions")) return <GithubActionsLogo className={className} />;
  if (normalized.includes("github")) return <GithubLogo className={className} />;
  if (normalized.includes("figma to pixel") || normalized.includes("pixel ui")) return <PixelUiLogo className={className} />;
  if (normalized.includes("figma")) return <FigmaLogo className={className} />;
  if (normalized.includes("vite")) return <ViteLogo className={className} />;
  if (normalized.includes("responsive")) return <ResponsiveLayoutsLogo className={className} />;
  if (normalized.includes("async")) return <AsyncDataLogo className={className} />;
  if (normalized.includes("state architecture")) return <StateArchitectureLogo className={className} />;
  if (normalized.includes("vs code")) return <VsCodeLogo className={className} />;
  if (normalized.includes("npm")) return <NpmLogo className={className} />;
  if (normalized.includes("performance") || normalized.includes("core web vitals")) return <PerformanceLogo className={className} />;

  // Backend
  if (normalized.includes("node")) return <NodejsLogo className={className} />;
  if (normalized.includes("express")) return <ExpressLogo className={className} />;
  if (normalized.includes("restful") || normalized.includes("rest api")) return <RestApiLogo className={className} />;
  if (normalized.includes("mongo")) return <MongodbLogo className={className} />;
  if (normalized.includes("mongoose")) return <MongooseLogo className={className} />;
  if (normalized.includes("postgres")) return <PostgresqlLogo className={className} />;
  if (normalized.includes("prisma")) return <PrismaLogo className={className} />;
  if (normalized.includes("redis")) return <RedisLogo className={className} />;
  if (normalized.includes("jwt")) return <JwtLogo className={className} />;
  if (normalized.includes("rbac") || normalized.includes("role-based")) return <RbacLogo className={className} />;
  if (normalized.includes("postman")) return <PostmanLogo className={className} />;
  if (normalized.includes("swagger")) return <SwaggerLogo className={className} />;

  // DevOps
  if (normalized.includes("linux")) return <LinuxLogo className={className} />;
  if (normalized.includes("bash")) return <BashLogo className={className} />;
  if (normalized.includes("python")) return <PythonLogo className={className} />;
  if (normalized.includes("docker compose")) return <DockerComposeLogo className={className} />;
  if (normalized.includes("docker")) return <DockerLogo className={className} />;
  if (normalized.includes("aws")) return <AwsLogo className={className} />;
  if (normalized.includes("terraform")) return <TerraformLogo className={className} />;
  if (normalized.includes("ansible")) return <AnsibleLogo className={className} />;
  if (normalized.includes("kubernetes")) return <KubernetesLogo className={className} />;
  if (normalized.includes("helm")) return <HelmLogo className={className} />;
  if (normalized.includes("ci/cd")) return <CicdLogo className={className} />;
  if (normalized.includes("devsecops")) return <DevSecOpsLogo className={className} />;
  if (normalized.includes("observability") || normalized.includes("monitoring")) return <ObservabilityLogo className={className} />;

  // Generative AI
  if (normalized.includes("llm") || normalized.includes("language model")) return <LlmsLogo className={className} />;
  if (normalized.includes("prompt")) return <PromptEngineeringLogo className={className} />;
  if (normalized.includes("tool calling") || normalized.includes("function calling")) return <ToolCallingLogo className={className} />;
  if (normalized.includes("rag")) return <RagLogo className={className} />;
  if (normalized.includes("vector") || normalized.includes("embedding")) return <VectorDbLogo className={className} />;
  if (normalized.includes("agentic")) return <AgenticAiLogo className={className} />;
  if (normalized.includes("langgraph")) return <LangGraphLogo className={className} />;
  if (normalized.includes("multi-agent")) return <MultiAgentLogo className={className} />;
  if (normalized.includes("mcp") || normalized.includes("model context protocol")) return <McpLogo className={className} />;
  if (normalized.includes("generative ui")) return <GenerativeUiLogo className={className} />;
  if (normalized.includes("ai observability") || normalized.includes("evaluation")) return <AiObservabilityLogo className={className} />;
  if (normalized.includes("human-in-the-loop")) return <HitlLogo className={className} />;

  // Fallback
  return <Html5Logo className={className} />;
}

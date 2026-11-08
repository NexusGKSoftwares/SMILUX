import React, { useState } from 'react';

/**
 * Female Avatar SVG: Modern professional female practitioner
 */
export function FemaleAvatar({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#fdf2f8" />
      <circle cx="50" cy="50" r="49" stroke="#fbcfe8" strokeWidth="2" />
      
      {/* Back hair */}
      <path d="M28 44 C26 62 29 74 34 82 C42 84 58 84 66 82 C71 74 74 62 72 44 C72 26 62 20 50 20 C38 20 28 26 28 44 Z" fill="#334155" />
      
      {/* Neck */}
      <path d="M44 60 H56 V72 H44 Z" fill="#fed7aa" />
      
      {/* Clothes / Scrubs */}
      <path d="M22 100 C22 84 32 74 44 72 L50 80 L56 72 C68 74 78 84 78 100 Z" fill="#e8368f" />
      
      {/* Collar & V-neck */}
      <path d="M44 72 L50 82 L56 72" fill="#fed7aa" />
      <path d="M43 73 L50 83 L57 73" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Stethoscope */}
      <path d="M38 78 Q42 90 50 90 Q58 90 62 78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="91" r="3" fill="#94a3b8" />
      
      {/* Face */}
      <path d="M35 44 C35 34 41 28 50 28 C59 28 65 34 65 44 C65 55 58 64 50 64 C42 64 35 55 35 44 Z" fill="#ffedd5" />
      
      {/* Front hair */}
      <path d="M34 40 C36 30 43 24 50 24 C57 24 65 28 66 36 C62 33 55 32 48 35 C42 37 38 41 34 40 Z" fill="#334155" />
      <path d="M34 42 C33 46 32 50 33 54 C34 50 35 45 36 43 Z" fill="#1e293b" />
      <path d="M66 42 C67 46 68 50 67 54 C66 50 65 45 64 43 Z" fill="#1e293b" />
      
      {/* Eyes & Eyebrows */}
      <circle cx="43" cy="45" r="2.2" fill="#1e293b" />
      <circle cx="57" cy="45" r="2.2" fill="#1e293b" />
      <path d="M40 40 Q43 38 46 40" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M54 40 Q57 38 60 40" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Smile & Cheeks */}
      <circle cx="39" cy="49" r="2.5" fill="#f472b6" opacity="0.4" />
      <circle cx="61" cy="49" r="2.5" fill="#f472b6" opacity="0.4" />
      <path d="M46 53 Q50 57 54 53" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Male Avatar SVG: Modern professional male practitioner
 */
export function MaleAvatar({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#f0f9ff" />
      <circle cx="50" cy="50" r="49" stroke="#bae6fd" strokeWidth="2" />
      
      {/* Neck */}
      <path d="M43 58 H57 V72 H43 Z" fill="#fed7aa" />
      
      {/* Doctor Coat / Clothes */}
      <path d="M22 100 C22 84 32 72 44 70 L50 78 L56 70 C68 72 78 84 78 100 Z" fill="#0284c7" />
      
      {/* Collar & Tie */}
      <path d="M44 70 L50 82 L56 70" fill="#ffffff" />
      <path d="M49 73 L51 73 L52 82 L50 85 L48 82 Z" fill="#2563eb" />
      
      {/* Stethoscope */}
      <path d="M37 77 Q41 89 50 89 Q59 89 63 77" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="90" r="3" fill="#64748b" />
      
      {/* Ears */}
      <circle cx="33" cy="46" r="4" fill="#fed7aa" />
      <circle cx="67" cy="46" r="4" fill="#fed7aa" />
      
      {/* Face */}
      <path d="M35 43 C35 32 41 27 50 27 C59 27 65 32 65 43 C65 54 58 63 50 63 C42 63 35 54 35 43 Z" fill="#ffedd5" />
      
      {/* Short Hair */}
      <path d="M33 38 C32 28 39 21 50 21 C61 21 68 28 67 38 C64 35 59 34 53 34 C44 34 37 36 33 38 Z" fill="#1e293b" />
      
      {/* Eyes & Eyebrows */}
      <circle cx="43" cy="44" r="2.2" fill="#1e293b" />
      <circle cx="57" cy="44" r="2.2" fill="#1e293b" />
      <path d="M39 39 Q43 37 47 39" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M53 39 Q57 37 61 39" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Smile */}
      <path d="M46 52 Q50 56 54 52" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Custom / Neutral Avatar SVG: Sleek modern gender-neutral practitioner avatar
 */
export function CustomAvatar({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#f8fafc" />
      <circle cx="50" cy="50" r="49" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Subtle modern geometric background accent */}
      <circle cx="50" cy="50" r="46" fill="#f1f5f9" />
      
      {/* Torso / Shoulders */}
      <path d="M22 100 C22 83 34 71 50 71 C66 71 78 83 78 100 Z" fill="#475569" />
      
      {/* Doctor Coat V-line */}
      <path d="M45 71 L50 82 L55 71" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Medical Cross Badge on chest */}
      <circle cx="50" cy="88" r="6" fill="#ffffff" />
      <path d="M47.5 88 H52.5 M50 85.5 V90.5" stroke="#2ec4b6" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Head */}
      <circle cx="50" cy="42" r="19" fill="#94a3b8" />
      
      {/* Face silhouette highlight */}
      <circle cx="50" cy="42" r="16.5" fill="#cbd5e1" />
      <circle cx="50" cy="42" r="14" fill="#e2e8f0" />
    </svg>
  );
}

/**
 * UserAvatar Component
 * 
 * Renders:
 * 1. user.avatar (if custom image URL provided)
 * 2. FemaleAvatar if user.gender is 'female'
 * 3. MaleAvatar if user.gender is 'male'
 * 4. CustomAvatar if user.gender is undefined / custom / not specified
 */
export default function UserAvatar({ user, className = "h-8 w-8" }) {
  const [imgError, setImgError] = useState(false);
  const avatarSrc = user?.avatar || user?.avatarUrl || user?.image || user?.photo;

  if (avatarSrc && !imgError) {
    return (
      <img
        src={avatarSrc}
        alt={user?.name || 'User Avatar'}
        onError={() => setImgError(true)}
        className={`rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  const gender = user?.gender ? String(user.gender).toLowerCase().trim() : '';

  if (gender === 'female' || gender === 'f' || gender === 'woman') {
    return <FemaleAvatar className={`rounded-full shrink-0 ${className}`} />;
  }

  if (gender === 'male' || gender === 'm' || gender === 'man') {
    return <MaleAvatar className={`rounded-full shrink-0 ${className}`} />;
  }

  return <CustomAvatar className={`rounded-full shrink-0 ${className}`} />;
}

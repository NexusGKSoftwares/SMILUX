import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    const defaultTitle = 'Smilux Software — Smart Dental Practice Management System';
    document.title = title ? `${title} | Smilux Software` : defaultTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    if (keywords) {
      let metaKeys = document.querySelector('meta[name="keywords"]');
      if (metaKeys) {
        metaKeys.setAttribute('content', keywords);
      }
    }
  }, [title, description, keywords]);

  return null;
}

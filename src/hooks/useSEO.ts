import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

export function useSEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Save original values
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

    // Set title
    document.title = title;
    
    // Set meta description
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.name = 'description';
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }

    // Set Open Graph tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setMetaTag('og:title', title);
    if (description) setMetaTag('og:description', description);
    setMetaTag('og:type', ogType);
    if (canonicalUrl || typeof window !== 'undefined') {
      setMetaTag('og:url', canonicalUrl || window.location.href);
    }

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonicalUrl);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalTag);
      }
    }

    // JSON-LD Structured Data Injection
    let scriptTag = document.getElementById('calit-jsonld') as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'calit-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // Cleanup on unmount
    return () => {
      document.title = originalTitle;
      if (description && metaDescription) {
        metaDescription.setAttribute('content', originalDescription || '');
      }
      const existingScript = document.getElementById('calit-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, JSON.stringify(structuredData)]);
}

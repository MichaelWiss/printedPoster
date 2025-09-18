/**
 * PerformanceMonitor Component
 * 
 * Monitors and reports Core Web Vitals and other performance metrics
 * for optimization insights.
 */

'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      console.log('LCP:', metrics.lcp, 'ms');
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        metrics.fid = (entry as any).processingStart - entry.startTime;
        console.log('FID:', metrics.fid, 'ms');
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      metrics.cls = clsValue;
      console.log('CLS:', metrics.cls);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Measure FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
          console.log('FCP:', metrics.fcp, 'ms');
        }
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Measure TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.fetchStart;
      console.log('TTFB:', metrics.ttfb, 'ms');
    }

    // Log all metrics after page load
    const logMetrics = () => {
      console.group('🚀 Performance Metrics');
      console.log('LCP (Largest Contentful Paint):', metrics.lcp, 'ms');
      console.log('FID (First Input Delay):', metrics.fid, 'ms');
      console.log('CLS (Cumulative Layout Shift):', metrics.cls);
      console.log('FCP (First Contentful Paint):', metrics.fcp, 'ms');
      console.log('TTFB (Time to First Byte):', metrics.ttfb, 'ms');
      console.groupEnd();

      // Performance recommendations
      if (metrics.lcp && metrics.lcp > 2500) {
        console.warn('⚠️ LCP is above 2.5s - consider optimizing images and critical resources');
      }
      if (metrics.fid && metrics.fid > 100) {
        console.warn('⚠️ FID is above 100ms - consider reducing JavaScript execution time');
      }
      if (metrics.cls && metrics.cls > 0.1) {
        console.warn('⚠️ CLS is above 0.1 - consider adding size attributes to images');
      }
    };

    // Log metrics after a delay to ensure all measurements are complete
    setTimeout(logMetrics, 3000);

    // Cleanup observers
    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Simple performance logger for production
 */
export function ProductionPerformanceLogger() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Log basic performance metrics in production
    const logBasicMetrics = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart;
        
        // Send to analytics service (replace with your analytics)
        console.log('Page Load Time:', loadTime, 'ms');
        console.log('DOM Content Loaded:', domContentLoaded, 'ms');
      }
    };

    // Log after page load
    if (document.readyState === 'complete') {
      logBasicMetrics();
    } else {
      window.addEventListener('load', logBasicMetrics);
      return () => window.removeEventListener('load', logBasicMetrics);
    }
  }, []);

  return null;
}

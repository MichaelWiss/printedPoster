/**
 * Newsletter Signup Component
 *
 * Client-side newsletter signup form to prevent hydration issues.
 * Isolated as a separate component to keep the main Footer server-side.
 *
 * @component
 */

'use client';

import { useState, useEffect } from 'react';

export function NewsletterSignup() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a static placeholder that matches the final render structure
    return (
      <form className='flex gap-2' aria-label='Newsletter signup'>
        <input
          type='email'
          placeholder='Enter your email'
          className='flex-1 px-3 py-2 text-body-sm border border-sage-green/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green'
          aria-label='Email address'
          autoComplete='email'
          name='email'
          disabled
          suppressHydrationWarning
        />
        <button
          type='submit'
          className='btn btn-primary text-body-sm px-4 py-2 whitespace-nowrap'
          aria-label='Subscribe to newsletter'
          disabled
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <form className='flex gap-2' aria-label='Newsletter signup'>
      <input
        type='email'
        placeholder='Enter your email'
        className='flex-1 px-3 py-2 text-body-sm border border-sage-green/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green'
        aria-label='Email address'
        autoComplete='email'
        name='email'
        suppressHydrationWarning
      />
      <button
        type='submit'
        className='btn btn-primary text-body-sm px-4 py-2 whitespace-nowrap'
        aria-label='Subscribe to newsletter'
      >
        Subscribe
      </button>
    </form>
  );
}

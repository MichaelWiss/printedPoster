import { redirect } from 'next/navigation';

// Redirect to the main contact page
export default function ContactUsPage() {
  redirect('/contact');
}
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
interface PagesLayoutProps {
  children: React.ReactNode;
}


/**
 * PagesLayout acts as a nested layout for all routes within the (pages) route group.
 * In Next.js App Router:
 * - This layout wraps the children (the active sub-page, e.g., dashboard, settings, tasks).
 * - It is nested inside the root layout (src/app/layout.tsx).
 * - As requested, this file does not include/import any custom components.
 */
export default function PagesLayout({ children }: PagesLayoutProps) {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { School, Users, Mail, BarChart3, ArrowRight, Check } from 'lucide-react';
import { PricingPlans } from './PricingPlans';

export function LandingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Nesterly</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Transform Your School's
            <span className="block text-indigo-600">Enrollment Process</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Automate your enrollment funnel, nurture parent relationships, and make data-driven decisions with our all-in-one platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        {/* ... (rest of the features section remains the same) ... */}
      </section>

      {/* Pricing Section */}
      <PricingPlans />

      {/* Benefits Section */}
      <section className="py-24">
        {/* ... (rest of the benefits section remains the same) ... */}
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Enrollment Process?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join schools nationwide who trust Nesterly to grow their enrollment
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        {/* ... (footer section remains the same) ... */}
      </footer>
    </div>
  );
}
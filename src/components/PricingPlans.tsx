import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Up to 100 leads',
      'Basic email automation',
      'Standard analytics',
      'Email support',
      'Single user account',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '99',
    features: [
      'Up to 1,000 leads',
      'Advanced automation workflows',
      'Custom reporting',
      'Priority support',
      'Up to 5 team members',
      'API access',
      'Webhook integrations',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Unlimited',
    price: '299',
    features: [
      'Unlimited leads',
      'Custom automation builder',
      'Advanced analytics & BI',
      'Dedicated support',
      'Unlimited team members',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function PricingPlans() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free and upgrade as your school grows
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-sm border ${
                plan.popular ? 'border-indigo-600' : 'border-gray-200'
              } p-8 relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2">
                  <div className="bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="ml-2 text-gray-500">/month</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full px-4 py-2 rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
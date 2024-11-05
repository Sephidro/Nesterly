interface BenefitItemProps {
  text: string;
}

export function BenefitItem({ text }: BenefitItemProps) {
  return (
    <li className="flex items-center space-x-3">
      <svg className="h-5 w-5 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <span className="text-gray-700">{text}</span>
    </li>
  );
}
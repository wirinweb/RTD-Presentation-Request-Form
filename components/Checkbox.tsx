import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer text-gray-200 hover:text-white transition-colors">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="appearance-none h-5 w-5 border-2 border-[#29B6F6] bg-[#1976D2] checked:bg-[#29B6F6] transition-all duration-300"
        />
        {checked && (
          <svg className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="ml-3">{label}</span>
    </label>
  );
};

export default Checkbox;
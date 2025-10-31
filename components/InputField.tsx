
import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, value, onChange, type = 'text' }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-gray-200 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-gray-400 focus:border-white outline-none transition-colors duration-300 py-2"
        required
      />
    </div>
  );
};

export default InputField;

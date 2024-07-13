import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      className={`${checked ? 'bg-blue-600' : 'bg-gray-200'}
        relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span
        className={`${checked ? 'translate-x-6' : 'translate-x-1'}
          inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  );
};

export default Switch;

import { Switch } from '@nextui-org/react';

import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import useDarkMode from './use-darkmode';

function DarkModeSwitch() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <Switch
      className="flex flex-col justify-between w-full"
      isSelected={isDark}
      size="sm"
      color="primary"
      onChange={toggleDarkMode}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <FaMoon className={className} />
        ) : (
          <FaSun className={className} />
        )
      }
      aria-label="Toggle dark mode"
    >
      Dark mode
    </Switch>
  );
}
export default DarkModeSwitch;

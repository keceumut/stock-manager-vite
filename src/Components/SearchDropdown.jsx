import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {IoMdArrowDropdown} from 'react-icons/io'

function SearchDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  //Mock data
  const options = [
    'Ali Asrın Zeytin',
    'Ardali',
    'Umutcan Keçe',
    'Bora Yorgun Demokrat',
    'Ömer Annen Nerde',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isInputFocused) {
        // Focus the input when the dropdown button is clicked
        inputRef.current.focus();
      }
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="searchable-dropdown">
      <div className="relative inline-block text-left">
        <div >
          {selectedOption ? `Selected: ${selectedOption}` : 'Customer'}
        </div>
        <div className='relative mb-3 group'>
            <input
                ref={inputRef}
                type="text"
                placeholder={selectedOption || 'Search...'}
                value={searchValue}
                onChange={handleSearch}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="w-full"
              />
              <button onClick={toggleDropdown}
                className="absolute right-0 top-0 bg-primary-300 hover:bg-accent-300 w-[10%] transition-colors min-h-[100%]
                 border-gray-700 border-2 border-opacity-25 rounded-r-lg font-bold hover:text-primary-100"
              >
                <IoMdArrowDropdown className='inline'/>
              </button>
        </div>
        
        <AnimatePresence>
        {/* {(isOpen || isInputFocused) && ( */}
        {isInputFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 * filteredOptions.length }}
              className="dropdown-menu absolute w-full border-2 border-primary-200 bg-primary rounded-md shadow-lg"
            >
              <ul className="">
                {filteredOptions.map((option, index) => (
                  <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <li
                    onClick={() => selectOption(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-primary-200/50 ${
                      index !== options.length - 1
                        ? 'border-b border-secondary-500/20'
                        : ''
                    }`}
                  >
                    {option}
                  </li>
                </motion.div>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchDropdown;

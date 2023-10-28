import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";

function SearchDropdown({ options, onChange, showSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const filteredOptions = [];
  const inputRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);

    if (!isInputFocused) {
      // Focus the input when the dropdown button is clicked
      inputRef.current.focus();
    }
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  options.forEach((option) => {
    if (option.label.toLowerCase().includes(searchValue.toLowerCase())) {
      filteredOptions.push(option);
    }
  });

  return (
    <div className="searchable-dropdown">
      <div className="relative text-left">
        {/* <div>{selectedOption ? `Selected: ${selectedOption}` : "Customer"}</div> */}
        <div className="relative mb-3 group">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              showSelectedOption
                ? selectedOption?.label || "Search..."
                : "Search..."
            }
            value={searchValue}
            onChange={handleSearch}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="w-full"
          />
          <button
            onClick={(e) => toggleDropdown(e)}
            className="absolute right-0 top-0 bg-primary-300 hover:bg-accent-300 w-[10%] transition-colors min-h-[100%]
                 border-gray-700 border-2 border-opacity-25 rounded-r-lg font-bold hover:text-primary-100"
          >
            <IoMdArrowDropdown className="inline" />
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
              className="dropdown-menu absolute w-full border-2 border-primary-200 bg-primary rounded-md shadow-lg z-30 max-h-[200px] overflow-x-hidden overflow-y-auto"
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
                          ? "border-b border-secondary-500/20"
                          : ""
                      }`}
                    >
                      {option.label}
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

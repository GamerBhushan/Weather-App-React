import { useState } from "react";
import { motion } from "framer-motion";

const SearchComponent = () => {
  const [addressInput, setAddressInput] = useState<string>(""); // Explicitly define as string
  const [filteredResults, setFilteredResults] = useState<string[]>([]); // Explicitly define as string array

  const cities = ["Mumbai", "Pune", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata"];

  // Function to filter cities
  const handleSearch = (input: string) => {
    setAddressInput(input);
    if (input.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="relative w-80">
      {/* Search Input */}
      <motion.input
        className="input w-full p-2 border rounded-md"
        type="text"
        value={addressInput}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Enter Your City"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
      />

      {/* Suggestions Dropdown */}
      {filteredResults.length > 0 && (
        <motion.ul
          className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredResults.map((city, index) => (
            <motion.li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setAddressInput(city);
                setFilteredResults([]);
              }}
            >
              {city}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default SearchComponent;

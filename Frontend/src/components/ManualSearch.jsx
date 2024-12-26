import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const ManualSearch = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    "How does Vox Debate work?",
    "What is sentiment analysis in debates?",
    "Can I choose debate topics?",
    "How do I adjust the AI's response tone?",
    "Can I save and review previous debates?",
    "How do I provide feedback on AI responses?",
  ];

  // Filter FAQ based on the query entered
  const filteredFAQs = faqs.filter((faq) =>
    faq.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full p-6 rounded-lg shadow-md mb-8">
      <Command>
        <CommandInput
          placeholder="Search for answers about Vox Debate..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500 transition-all"
        />
        <CommandList>
          {filteredFAQs.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Frequently Asked Questions">
              {filteredFAQs.map((faq, index) => (
                <CommandItem
                  key={index}
                  className="hover:bg-orange-100 transition-all"
                >
                  {faq}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default ManualSearch;

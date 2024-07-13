import React, { useState } from 'react';
import Autosuggest, { ChangeEvent, SuggestionSelectedEventData } from 'react-autosuggest';
import axios from 'axios';

interface CompanySuggestion {
  companyName: string;
}

const AutoCompleteCompany: React.FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<CompanySuggestion[]>([]);

  const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
    if (value) {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/company-names', {
          params: { query: value },
          withCredentials: true
        });

        // Convert array of strings to array of objects
        const companies = response.data.map((companyName: string) => ({ companyName }));

        setSuggestions(companies);
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: CompanySuggestion) => suggestion.companyName;

  const renderSuggestion = (suggestion: CompanySuggestion, { isHighlighted }: { isHighlighted: boolean }) => (
    <div className={`p-2 cursor-pointer ${isHighlighted ? 'bg-gray-200' : 'bg-white'}`}>
      {suggestion.companyName}
    </div>
  );

  const inputProps = {
    placeholder: 'Enter company name',
    value,
    onChange: (event: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
      onChange(newValue);
    },
    className: "w-full p-2 border border-gray-300 rounded-lg"
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: 'relative',
        suggestionsContainer: 'absolute mt-1 w-full bg-white border border-gray-300 rounded-lg z-10',
        suggestionsList: 'list-none p-0 m-0',
        suggestion: '',
        suggestionHighlighted: 'bg-gray-200',
      }}
    />
  );
};

export default AutoCompleteCompany;

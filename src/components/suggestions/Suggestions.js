import SuggestionItem from "./SuggestionItem";
import { useEffect, useState } from "react";
import { template } from "../../data/entities";
import { dataLayer } from "../../data/dataLayer";

// const suggestionStatuses = {
//   new: 'new',
//   editing: 'editing',
//   upToDate: 'upToDate',
// };

const Suggestions = ({request}) => {
  const [suggestions, setSuggestions] = useState([]);

  // const newSuggestion = {...template.suggestion, groupId: request.groupId, sessionId: request.sessionId, requestId: request.id, status: suggestionStatuses.new};

  useEffect(() => {
    dataLayer.suggestion.onSuggestionsChange({ sessionId: request.sessionId, groupId: request.groupId, requestId: request.id, callback: ({documents}) => {
      // const suggestions = [...documents, newSuggestion];
      // setSuggestions(suggestions);
      setSuggestions(documents);
    } });
  }, [request]);

  return (
    <div className="padding-top-bottom-xs">
      <div className="text bold size-xxl">Suggestions</div>

      <div className="flex column gap-sm">
        {suggestions.map(suggestion => (
          <SuggestionItem suggestion={suggestion} key={suggestion.id} />
        ))}

      </div>
    </div>
  );
}

export default Suggestions;
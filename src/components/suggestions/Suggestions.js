import SuggestionItem from "./SuggestionItem";
import { useEffect, useState } from "react";
import { template } from "../../data/entities";
import { dataLayer } from "../../data/dataLayer";
import string from "../../utils/string";

const Suggestions = ({request}) => {
  const [suggestions, setSuggestions] = useState([]);

  const newSuggestion = {...template.suggestion, id: string.generateAlphaNumericCode(12), groupId: request.groupId, sessionId: request.sessionId, requestId: request.id};

  useEffect(() => {
    dataLayer.suggestion.onSuggestionsChange({ sessionId: request.sessionId, groupId: request.groupId, requestId: request.id, callback: ({documents}) => {
      const suggestions = [...documents, newSuggestion];

      if(documents[documents.length-1] && documents[documents.length-1].updatedAt) {
        setSuggestions(documents);
        return;
      }

      setSuggestions(suggestions);
    } });
  }, []);

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
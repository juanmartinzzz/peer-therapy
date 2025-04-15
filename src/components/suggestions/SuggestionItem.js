import TextInputDynamic from "../form/TextInputDynamic";
import suggestionActions from "../../assets/img/suggestionActions.png";
import { dataLayer } from "../../data/dataLayer";
import { useEffect, useRef, useState } from "react";

const updateSuggestion = ({suggestion, setShouldUpdate}) => {
  dataLayer.suggestion.updateSuggestion({suggestion});
  setShouldUpdate(false);
}

const SuggestionItem = ({suggestion}) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
  const shouldUpdateRef = useRef(shouldUpdate);
  const currentSuggestionRef = useRef(currentSuggestion);

  useEffect(() => {
    shouldUpdateRef.current = shouldUpdate;
    currentSuggestionRef.current = currentSuggestion;
  }, [shouldUpdate, currentSuggestion]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(shouldUpdateRef.current) {
        updateSuggestion({suggestion: currentSuggestionRef.current, setShouldUpdate});
      }
    }, 8 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex">
      <div>
        <img src={suggestionActions} width={32} alt="Suggestion actions" />
      </div>

      <div className="background-grayscale-0 padding-sm border-main rounded-xs" style={{flex: 1}}>
      <div className="text size-xxxs">{suggestion.id}</div>
      <div className="text size-xxxs">{suggestion.updatedAt ? 'UpdatedAt' : 'New'}</div>
        <div className="text size-md">
          <TextInputDynamic size="sm" bold={true} placeholder="Add a new suggestion" value={currentSuggestion.title} onChange={({target}) => {
            setShouldUpdate(true);
            setCurrentSuggestion({...currentSuggestion, title: target.value});
          }} />
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;
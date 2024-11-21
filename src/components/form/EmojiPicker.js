import { useState } from "react";

const onSelectEmoji = ({emoji, setSelectedEmoji, setShouldShowMoreOptions, onClick}) => {
  onClick({emoji});
  setSelectedEmoji(emoji);
  setShouldShowMoreOptions(false);
}

const EmojiPicker = ({emojis = [], currentEmoji = '🤬', onClick = () => {}, numberOfEmojisToShowInitially = 3}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(currentEmoji);
  const [shouldShowMoreOptions, setShouldShowMoreOptions] = useState(false);

  const initialEmojiKeys = Object.keys(emojis).slice(0, numberOfEmojisToShowInitially);
  const restEmojiKeys = Object.keys(emojis).slice(numberOfEmojisToShowInitially);

  const Emoji = ({emoji}) => (
    <div
      className="padding-left-right-sm pointer"
      style={{borderRadius: '4px', border: `1px solid ${selectedEmoji === emojis[emoji] ? 'var(--pt-palette-main)' : '#ffffff'}`}}
      onClick={() => onSelectEmoji({emoji: emojis[emoji], setSelectedEmoji, setShouldShowMoreOptions, onClick})}
    >{emojis[emoji]}</div>
  );

  return (
    <>
      <div className="flex wrap gap-xxs" style={{fontSize: '36px', maxHeight: '320px', overflow: 'scroll'}}>
        {initialEmojiKeys.map(emoji => <Emoji emoji={emoji} key={emoji} />)}
        {!shouldShowMoreOptions ? (
          <div className="padding-xs text center size-sm bold" onClick={() => setShouldShowMoreOptions(true)}>{numberOfEmojisToShowInitially !== 0 ? 'MORE' : 'SHOW'}<br />EMOJIS</div>
        ) : (
          <>
            {restEmojiKeys.map(emoji => <Emoji emoji={emoji} key={emoji} />)}
          </>
        )}
      </div>
    </>
  );
}

export default EmojiPicker;
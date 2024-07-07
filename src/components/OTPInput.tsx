import React from 'react';

import './styles.css';

export const OTPInput = () => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [inputFocusedIndex, setInputFocusedIndex] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const eventType = (event.nativeEvent as any).inputType; // TODO: fix inputType does not exist on type Event

    if (eventType === 'insertText') {
      if (value.length === 1) {
        const nextIndex = inputFocusedIndex === 5 ? 5 : inputFocusedIndex + 1;
        setInputFocusedIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    }

    if (eventType === 'deleteContentBackward') {
      if (value.length === 0) {
        const nextIndex = inputFocusedIndex === 0 ? 0 : inputFocusedIndex - 1;
        setInputFocusedIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.slice(0, 1);
    event.currentTarget.value = value;
  };

  return (
    <div className="otp-container">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <input
            className={`otp-input otp-input-${index}`}
            key={index}
            type="number"
            maxLength={1}
            min={0}
            max={9}
            pattern="[0-9]{1}"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={handleChange}
            onInput={handleInput}
          />
        );
      })}
    </div>
  );
};

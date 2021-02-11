import { FormControl, ValidationErrors } from '@angular/forms';

export function restrictedWordsValidator(words) {
  return (control: FormControl): ValidationErrors | null => {
    if (!words) return null;
    const invalidWords = [];
    words.forEach((word) => {
      control.value.includes(word) && invalidWords.push(word);
    });
    return invalidWords.length
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}

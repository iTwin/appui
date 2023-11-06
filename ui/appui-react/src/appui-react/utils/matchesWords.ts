/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Interface that returns indices of matches
 * @internal
 */
export interface IMatch {
  start: number;
  end: number;
}

/**
 * Matches beginning of words supporting non-ASCII languages.
 * @param word Filter string
 * @param target String being searched
 * @param contiguous - If true the filter string must be found "contiguous" in the searched string (E.g. "pul" will match "Git: Pull").
 * Otherwise also matches sub string of the word with beginnings of the words in the target (e.g. "gp" or "g p" will match "Git: Pull").
 * Useful in cases where the target is words (e.g. command labels)
 * @internal
 */
export function matchesWords(
  word: string,
  target: string,
  contiguous: boolean = false
): IMatch[] | null {
  if (!target || target.length === 0) {
    return null;
  }

  let result: IMatch[] | null = null;
  let i = 0;

  word = word.toLowerCase();
  target = target.toLowerCase();
  while (
    i < target.length &&
    (result = matchesWordsInternal(word, target, 0, i, contiguous)) === null
  ) {
    i = nextWord(target, i + 1);
  }

  return result;
}

function matchesWordsInternal(
  word: string,
  target: string,
  i: number,
  j: number,
  contiguous: boolean
): IMatch[] | null {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    let result: IMatch[] | null = null;
    let nextWordIndex = j + 1;
    result = matchesWordsInternal(word, target, i + 1, j + 1, contiguous);
    if (!contiguous) {
      while (
        !result &&
        (nextWordIndex = nextWord(target, nextWordIndex)) < target.length
      ) {
        result = matchesWordsInternal(
          word,
          target,
          i + 1,
          nextWordIndex,
          contiguous
        );
        nextWordIndex++;
      }
    }
    return result === null ? null : join({ start: j, end: j + 1 }, result);
  }
}

function nextWord(word: string, start: number): number {
  for (let i = start; i < word.length; i++) {
    if (
      isWordSeparator(word.charCodeAt(i)) ||
      (i > 0 && isWordSeparator(word.charCodeAt(i - 1)))
    ) {
      return i;
    }
  }
  return word.length;
}

enum CharCode {
  Space = 32,
  Tab = 9,
  LineFeed = 10,
  CarriageReturn = 13,
}

function isWhitespace(code: number): boolean {
  return (
    code === CharCode.Space ||
    code === CharCode.Tab ||
    code === CharCode.LineFeed ||
    code === CharCode.CarriageReturn
  );
}
const wordSeparators = new Set<number>();
"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?"
  .split("")
  .forEach((s) => wordSeparators.add(s.charCodeAt(0)));

function isWordSeparator(code: number): boolean {
  return isWhitespace(code) || wordSeparators.has(code);
}

function charactersMatch(codeA: number, codeB: number): boolean {
  return codeA === codeB || (isWordSeparator(codeA) && isWordSeparator(codeB));
}

function join(head: IMatch, tail: IMatch[]): IMatch[] {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }
  return tail;
}

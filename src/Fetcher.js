/*
 * Returns a promise for the fetching of characters
 */
export const getCharacters = () => {
  return fetch("https://www.swapi.tech/api/people").then((res) => res.json());
};

/*
 * url - The url of the character to be fetched
 *
 * Returns a promise for the fetching of a character
 */
export const getCharacterWithUrl = (url) => {
  return fetch(url).then((res) => res.json());
};

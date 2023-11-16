const getSubstringBetweenStartAndEnd = (
   string: string,
   substringStart: string,
   substringEnd: string
): string => {
   const stringIndexEnd = string.indexOf(substringEnd) + substringEnd.length;
   const stringIndexStart = string.lastIndexOf(substringStart, stringIndexEnd);
   return string.slice(stringIndexStart, stringIndexEnd);
};
export default getSubstringBetweenStartAndEnd;

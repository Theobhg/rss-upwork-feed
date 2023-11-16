/**
 * Returns the two halves of a string as object's proprieties.
 *
 * @remarks
 * This method is part of the AmadeuGMeniconi's wonderous mind.
 *
 * @param string - The text you want to split.
 * @param subString - The substring you want to split from the text. Note that the start of the substring indicates
 * the point where the text will be split and the end of the substring indicates the point where the split ends.
 * NOTE! Any substrings from the text that are after this substring will not be returned and thus excluded.
 * @returns An object that holds the firest and second half of the text.
 *
 *
 */

const splitStringInHalf = (string: string, subString: string) => {
   const result = { firstHalf: '', secondHalf: '' };

   result.firstHalf = string.substring(0, string.length - subString.length);
   result.secondHalf = string.substring(string.length, string.length - subString.length);
   return result;
};

export default splitStringInHalf;

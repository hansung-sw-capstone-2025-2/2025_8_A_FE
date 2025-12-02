/**
 * 괄호 앞까지만 텍스트를 잘라내는 유틸리티 함수
 * @param text
 * @returns
 * @example
 */
export const truncateBeforeParenthesis = (text: string): string => {
  const indexOfParenthesis = text.indexOf("(");
  if (indexOfParenthesis === -1) {
    return text;
  }
  return text.substring(0, indexOfParenthesis).trim();
};

/**
 * 영어에서 한글로 변환하는 유틸리티 함수
 * @param category
 * @returns
 * @example
 */
export const mapGenderToKorean = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory === "female") return "여성";
  if (lowerCategory === "male") return "남성";
  return category;
};

/**
 * 카테고리 텍스트를 처리하는 통합 유틸리티 함수
 * 괄호 제거 + 한글 변환을 한 번에 처리
 * @param text - 처리할 텍스트
 * @returns 처리된 텍스트
 */
export const processChartCategory = (text: string): string => {
  const truncated = truncateBeforeParenthesis(text);
  return mapGenderToKorean(truncated);
};

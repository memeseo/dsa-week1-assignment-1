//1. 가장 익숙한 방법으로 문제를 해결해 주세요.
const solution1 = (binaryString) => {
  const array = binaryString.split('').map(Number);
  let result = 0;

  for(let i = 0; i < array.length; i++){
    const num = array.length - (i + 1);
    result += array[i] * (2 ** num);
  }
 
  return result;
 };

// 2. 이번에는 재귀 함수로 문제를 해결해 주세요.
const solution2 = (binaryString) => {

  if (binaryString === '0') return 0;
  if (binaryString === '1') return 1;

  const array = binaryString.split('').map(Number);
  const num = array[0] * ( 2 ** (array.length - 1));

  return num + solution2(array.slice(1).join(''));
};

// 3. 꼬리 재귀 함수로 바꿔보세요.
const solution3 = (binaryString, num = 0) => {

  if(binaryString.length === 1) return num + Number(binaryString);
  
  const array = binaryString.split('').map(Number);
  num += array[0] * (2 ** (array.length - 1));
  
  return solution3(array.slice(1).join(''), num);
};

// 4. 꼬리 재귀 최적화를 통해서 최적화해 보세요.
const solution = (binaryString) => {
  
  let array = binaryString.split('').map(Number);
  let result = 0;

  while(true){
    if (array.toString() === '0') {
      return 0 + result;
    }

    if (array.toString() === '1') {
      return 1 + result;
    }

    result += array[0] * (2 ** (array.length - 1));
    array = array.slice(1);
  }
};

test('10진수 숫자를 반환한다', () => {
  expect(solution('0')).toBe(0);
  expect(solution('1')).toBe(1);
  expect(solution('10')).toBe(2);
  expect(solution('11')).toBe(3);
  expect(solution('100')).toBe(4);
  expect(solution('101')).toBe(5);
  expect(solution('110')).toBe(6);
  expect(solution('111')).toBe(7);
  expect(solution('1000')).toBe(8);
});

test('큰 입력이 주어져도 RangeError를 던지지 않는다', () => {
  const input = Number.MAX_VALUE.toString(2);

  expect(() => solution(input))
    .not.toThrowError(new RangeError('Maximum call stack size exceeded'));
});

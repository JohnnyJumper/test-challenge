// list of values and it tells you if the list contains duplicats

// time complexity O(N)
// space complexity O(N)

function has_duplicates(values: string[]): boolean {
  const frequencyMap: Map<string, number> = new Map();

  for (const value of values) {
    if (frequencyMap.get(value) == null) {
      frequencyMap.set(value, 1);
      continue;
    }
    return true;
  }
  return false;
}

function test(values: string[]): void {
  console.log(values);
  console.log("has duplicates: ", has_duplicates(values));
}

function main() {
  const test_case_1: string[] = ["a", "b", "c"]; // false
  test(test_case_1);

  const test_case_2: string[] = ["ab", "c", "ab"]; // true
  test(test_case_2);

  const test_case_3: string[] = [];
  test(test_case_3); // false
}

main();

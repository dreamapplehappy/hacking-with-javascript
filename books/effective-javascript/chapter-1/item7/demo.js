console.log("𝄞 clef".length); // 7
console.log("G clef".length); // 6

console.log("𝄞 clef".charCodeAt(0)); // 55348 (0xd834)
console.log("𝄞 clef".charCodeAt(1)); // 56606 (0xdd1e)

console.log("𝄞 clef".charAt(0));
console.log("𝄞 clef".charAt(1));

console.log("𝄞 clef".charAt(2) === " "); // true
console.log("𝄞 clef".charAt(1) === " "); // false

console.log(/^.$/.test("𝄞")); // false
console.log(/^..$/.test("𝄞")); // true ..表示两个16位编码的字符

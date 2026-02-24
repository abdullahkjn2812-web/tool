var a = 1;

function foo() {
  console.log(a);
  a = 2;
}

function bar() {
  var a = 3;
  foo();
}

bar();
console.log(a);


// include app/assets/javascripts/foo.js

describe('Foo', function() {
  it("does something", function() {
    expect(1 + 1).toBe(2);
  });

  it("creates an object with a name and number", function() {
  	var object = new bigObject("Steve", 99);
  	expect(object.name).toBe("Steve");
  	expect(object.number).toBe(99);
  });
});
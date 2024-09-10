const areaOfCircle = require("../utils/areaOfCircle");
const {test, describe, expect}  = require ("@jest/globals");

test('are of a circle', () => {
    expect(areaOfCircle(2)).toBe(12);
  });


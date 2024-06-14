#import "@preview/suiji:0.3.0"


#let random(seed) = {
  return suiji.gen-rng(seed)
}

// - low: included
// - high: excluded
#let integer(random, low, high) = {
  if (type(low) != int or type(high) != int) {
    panic("Expected 'low' and 'high' to be ints")
  }
  if (low >= high) {
    panic("Expected 'high' to be strictly greater than 'low'")
  }

  let integer = none
  (random, integer) = suiji.integers(random, low: low, high: high)
  return (random, integer)
}

// - low: included
// - high: excluded
#let integers(random, count, low, high) = {
  if (type(low) != int or type(high) != int) {
    panic("Expected 'low' and 'high' to be ints")
  }
  if (low >= high) {
    panic("Expected 'high' to be strictly greater than 'low'")
  }
  if (type(count) != int or count <= 0) {
    panic("Expected 'count' to be an int greater than 0")
  }

  let integers = none
  (random, integers) = suiji.integers(random, low: low, high: high, size: count)
  return (random, integers)
}

#let pick(random, array) = {
  let item = none
  (random, item) = suiji.choice(random, array, replacement: false)
  return (random, item)
}

#let sample(random, count, array) = {
  if (type(count) != int or count <= 0) {
    panic("Expected 'count' to be an int greater than 0", count)
  }

  let items = none
  ((random), items) = suiji.choice(random, array, size: count, replacement: false)
  return (random, items)
}

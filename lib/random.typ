#import "@preview/suiji:0.3.0"


#let random(seed) = {
  return suiji.gen-rng(seed)
}

// - low: included
// - high: excluded
#let integer(random, low, high) = {
  let integer = none
  (random, integer) = suiji.integers(random, low: low, high: high)
  return (random, integer)
}

// - low: included
// - high: excluded
#let integers(random, count, low, high) = {
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
  let items = none
  ((random), items) = suiji.choice(random, array, size: count, replacement: false)
  return (random, items)
}

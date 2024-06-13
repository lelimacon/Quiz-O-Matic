#import "@preview/suiji:0.3.0"


// Scale: USA grades.
#let level-grades = (
  kindergarten: 0,
  g1: 1,
  g2: 2,
  g3: 3,
  g4: 4,
  g5: 5,
  g6: 6,
  g7: 7,
  g8: 8,
  g9: 9,
  g10: 10,
  g11: 11,
  g12: 12,
)

// Scale: CEFR
// Common European Framework of Reference for Languages.
// A1, A2, B1, B2, C1, C2.
#let level-cefr = (
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
)

// Question time to solve approximation (in minutes).
#let lengths = (
  instant: 1,
  quick: 2,
  average: 5,
  long: 10,
  full: 30,
  double: 60,
)

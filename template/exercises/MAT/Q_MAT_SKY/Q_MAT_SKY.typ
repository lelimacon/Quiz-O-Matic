#import "../../../builder.typ" as builder
#import "../../../entities.typ"
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *

#import "@preview/cetz:0.2.2" as cetz


#let arithmetic-factors(n) = {
  return range(1, n + 1).filter(i => calc.rem(n, i) == 0)
}
#let arithmetic-hcf(a, b) = {
  let a-factors = arithmetic-factors(calc.floor(a))
  let b-factors = arithmetic-factors(calc.floor(b))
  let a-index = a-factors.len() - 1
  let b-index = b-factors.len() - 1
  while a-index > 0 or b-index > 0 {
    let a-factor = a-factors.at(a-index)
    let b-factor = b-factors.at(b-index)
    if a-factor == b-factor {
      return a-factor
    }
    if a-factor > b-factor {
      a-index = a-index - 1
    } else {
      b-index = b-index - 1
    }
  }
  return 1
}
#let arithmetic-simplify-fraction(n, d) = {
  let hcf = arithmetic-hcf(n, d)
  if (hcf == d) {
    return $#(n / hcf)$
  }
  return $#(n / hcf) / #(d / hcf)$
}

#let scale = 1/3

#let image-burj-khalifa = image("skyline-burj-khalifa.svg", height: 900pt * scale)
#let image-eiffel-tower = image("skyline-eiffel-tower.svg", height: 400pt * scale)
#let image-giza = image("skyline-giza.svg", height: 200pt * scale)
#let image-bank-of-china-tower = image("skyline-bank-of-china-tower.svg", height: 400pt * scale)
#let image-marina-bay-sands = image("skyline-marina-bay-sands.svg", height: 200pt * scale)
#let image-sydney-opera-house = image("skyline-sydney-opera-house.svg", height: 100pt * scale)


#let towers = (
  (
    name: "Burj Khalifa",
    height: 828,
    height-approximation: 800,
    description: [
      The _Burj Khalifa_ is a megatall _162 stories_ high skyscraper in _Dubai, United Arab Emirates_.
      It opened in _2010_ as the tallest structure made by humans in the world.
      //at _828 metres_ or _162 stories_ high.
    ],
    image: image-burj-khalifa,
  ),
  (
    name: "Eiffel Tower",
    height: 324, // 300 without antenna
    height-approximation: 300,
    description: [
      The _Eiffel Tower_ was built for the _1889 World Fair_ in _Paris, France_,
      also the 100#super[th] anniversary of the French Revolution.
      //The tower is _324 meters_ tall, including the antenna.
    ],
    image: image-eiffel-tower,
  ),
  (
    name: "Great Pyramid of Giza",
    height: 146,
    height-approximation: 150,
    description: [
      The _Great Pyramid of Giza_ (the biggest one in the center)
      was built by the Ancient Egyptians over _4500 years ago_ in _Cairo, Egypt_.
      It served as the _tomb of pharaoh Khufu_.
      //_2 million blocks_ of limestone and granite
      //It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain mostly intact.
      //When it was built it was 146 metres (481 feet) tall. It was the tallest building in the world for over 3,800 years
    ],
    image: image-giza,
  ),
  (
    name: "BOC Tower",
    height: 315, // 369 with antenna
    height-approximation: 350,
    description: [
      The _Bank of China Tower_ is an iconic skyscraper of Hong Kong, China, completed in _1990_.
      It is designed to resemble _growing bamboo_, a symbol of vitality in Chinese culture.
      //and is today illuminated at night by LED strips.
    ],
    image: image-bank-of-china-tower,
  ),
  (
    name: "Marina Bay Sands",
    height: 194,
    height-approximation: 200,
    description: [
      _Marina Bay Sands_ is a resort fronting Marina Bay in _Singapore_ and a landmark of the city.
      At its opening in _2010_, it was deemed the world's most expensive standalone casino property.
    ],
    image: image-marina-bay-sands,
  ),
  (
    name: "Sydney Opera House",
    height: 65,
    height-approximation: 60,
    description: [
      The _Sydney Opera House_ is a multi-venue performing _arts centre_
      on the shores of the harbour in _Sydney, Australia_,
      that opened in _1973_.
      It is shaped like the sails of a boat.
    ],
    image: image-sydney-opera-house,
  ),
)


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, selected-towers) = sample(random, 2, towers)
  let tower1 = selected-towers.at(0)
  let tower2 = selected-towers.at(1)

  let (random, title) = pick(random, (
    [Skylines],
    [The sky is the limit],
    [Skyline architect],
    [Comparing structures],
    [Measuring world landmarks],
    [#tower1.name #text(style: "italic", [vs]) #tower2.name],
  ))

  return title
}

#let skyline(tower1, tower2) = {
  grid(
    columns: (1fr, auto, auto, 1fr),
    align: bottom + center,
    row-gutter: 8pt,

    grid.cell(
      align: bottom + left,
      inset: (
        right: 8pt,
      ),
      {
        builder.hint(tower1.description)
      }
    ),
    grid.cell(
      align: bottom,
      // Jam lhs into rhs to avoid a gap.
      inset: (
        right: -0.3pt,
      ),
      {
        tower1.image
      }
    ),
    grid.cell(
      align: bottom,
      // Jam rhs into lhs to avoid a gap.
      inset: (
        left: -0.3pt,
      ),
      {
        tower2.image
      }
    ),
    grid.cell(
      align: bottom + left,
      inset: (
        left: 8pt,
      ),
      {
        builder.hint(tower2.description)
      }
    ),
    {},
    [
      #emph(tower1.name)\
      #emph[\~ #(tower1.height-approximation) m]
    ],
    [
      #emph(tower2.name)\
      #emph[\~ #(tower2.height-approximation) m]
    ],
    {},
  )
}

// Structure:
// - 1 list item per point
#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, selected-towers) = sample(random, 2, towers)
  let tower1 = selected-towers.at(0)
  let tower2 = selected-towers.at(1)

  let (random, emoji) = pick(random, ("🗼", "🗽", "🗿"))

  // Statement.
  [
    #skyline(tower1, tower2)

    Above is a skyline with two iconic landmarks #emoji from the world
    and their respective approximate heights, in meters.
    Answer the questions below with sentences
    and by keeping the fraction amounts.

    #builder.hint[
      Pay attention to which height should be the numerator and denominator!
    ]
  ]

  // Randomly swap lhs & rhs towers.
  let (random, swap) = integer(random, 0, 2)
  if swap == 1 {
    let tower-tmp = tower1
    tower1 = tower2
    tower2 = tower-tmp
  }

  let height1 = tower1.height-approximation
  let height2 = tower2.height-approximation

  let result = arithmetic-simplify-fraction(height1, height2)

  let hcf = arithmetic-hcf(height1, height2)
  let n = calc.trunc(height1 / hcf)
  let d = calc.trunc(height2 / hcf)

  // Question 1.
  builder.input(2,
    [
      What fraction is the heigth of the #emph(tower1.name) to the height of the #emph(tower2.name)?
    ],
    [
      #block($ #height1 / #height2 = #result $)

      The heigth of the #emph(tower1.name) is #emph(box(result)) times
      the height of the #emph(tower2.name).
    ],
  )

  // Question 2.
  if length == lengths.medium {
    // (result - 1) OR (1 - result)  
    let comparison = if height1 >= height2 { "taller" } else { "shorter" }
    let operation = if height1 >= height2 { $#result - 1$ } else { $1 - #result$ }
    let n = if height1 >= height2 { n - d } else { d - n }
    let new-result = arithmetic-simplify-fraction(n, d)

    builder.input(3,
      [
        By what fraction is the #emph(tower1.name) #comparison than the #emph(tower2.name)?
      ],
      [
        #block($ #operation = #new-result $)

        The #emph(tower1.name) is #comparison than the #emph(tower2.name)
        by #emph(box(new-result)) times.
      ],
    )
  }
}


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.g6
  let length = lengths.medium

  import "../../../themes/T_PLN/T_PLN.typ" as theme
  //import "../../../themes/T_PDM/T_PDM.typ" as theme
  show: theme.apply

  builder.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()

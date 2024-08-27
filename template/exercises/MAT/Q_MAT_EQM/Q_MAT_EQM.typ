#import "../../../builder.typ" as builder
#import "../../../entities.typ"
#import "../../../constants.typ": *
#import "../../../random.typ": *
#import "../../../utils.typ": *


#let generate-title(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let person = none
  (random, person) = pick(random, entities.persons)

  let sex = if (person.sex == "m") { "boy" } else { "girl" }

  let (random, title) = pick(random, (
    [#f(person)'s toy collection],
    [#f(person)'s models],
    [#f(person) the collector],
    [Model collector #f(person)],
    [Collector #sex #f(person)],
  ))

  return title
}

#let generate-emoji-pattern(seed) = pattern(
  relative: "self",
  size: (60pt, 80pt),
  {
    let max-angle = 35
    let random = random(seed)
    let (random, angles) = sample(random, 6, range(2 * max-angle))
    let (random, objects) = sample(random, 6, entities.objects.filter(o => o.size == "l"))

    set text(fill: rgb("#a1a1aa"))
    let size = 14pt
    let emojis = range(6).map(i => rotate(
      (angles.at(i) - max-angle) * 1deg,
      text(size: size, objects.at(i).emoji)
    ))

    place(dx:  0pt, dy:  5pt, emojis.at(0))
    place(dx: 40pt, dy:  5pt, emojis.at(1))
    place(dx: 20pt, dy: 25pt, emojis.at(2))
    place(dx:  0pt, dy: 45pt, emojis.at(3))
    place(dx: 40pt, dy: 45pt, emojis.at(4))
    place(dx: 20pt, dy: 65pt, emojis.at(5))
  }
)


// Structure:
// - 1x 2p question
#let generate(
  seed: 0,
  level: none,
  length: none,
) = {
  let random = random(seed)

  let (random, person) = pick(random, entities.persons)
  let (random, objects) = sample(random, 2, entities.objects.filter(o => o.size == "l"))
  let object1 = objects.at(0)
  let object2 = objects.at(1)

  let (random, difference) = integer(random, 1, 20)
  let (random, factor) = integer(random, 2, 11)
  let (random, object2-count) = integer(random, 1, 5)
  let object1-count = object2-count * factor + difference

  let (random, statement) = pick(random, (
    par[
      #f-ve(person) is a hobby model collector.
      If #subject(person) had #emph[$#factor$] times more #f-ve(object2, n: 2),
      #subject(person) would have #emph[$#difference$] #f-ve(object1, n: 2)
      less than #f-v(object2, n: 2).
    ],
    par[
      With #f-ve(person)'s latest additions to #possessive(person) model collection,
      #possessive(person) #f-v(object1, n: 2) are #emph[$#difference$] short
      from #emph[$#factor$] times #possessive(person) #f-ve(object2, n: 2).
      #up(subject(person)) has #emph[$#object1-count$] #f-ve(object1, n: 2).
    ],
    par[
      #f-ve(person) is an avid model collector.
      #up(subject(person)) has #emph[$#object1-count$] #f-ve(object1, n: 2),
      #emph[$#difference$] less #f-v(object1, n: 2)
      than #emph[$#factor$] times #possessive(person) #f-ve(object2, n: 2).
    ],
  ))

  let input = builder.input(2,
    [
      Let $x$ be the number of #f-v(person)'s #f-v(object2, n: 2).
      Calculate $x$ with an equation.
    ],
    [
      #block[$ #factor x - #difference = #object1-count $]
      #block[$ #factor x = #object1-count + #factor $]
      #block[$ x = (#object1-count + #factor) / #factor $]
      #block[$ x = #object2-count $]
    ],
  )

  grid(
    columns: (auto, 60pt),
    gutter: 8pt,
    align: horizon,

    {
      statement
      input
    },
    grid.cell(
      fill: generate-emoji-pattern(seed),
      []
    )
  )
}


// Preview.
#let preview() = {
  let seed = 42
  let level = level-grades.g6
  let length = lengths.quick

  import "../../../themes/T_PLN/T_PLN.typ" as theme
  show: theme.apply

  builder.exercise(
    length,
    generate-title(seed: seed, level: level, length: length),
    generate(seed: seed, level: level, length: length),
  )
}

// Keep commented to avoid breaking imports.
//#preview()

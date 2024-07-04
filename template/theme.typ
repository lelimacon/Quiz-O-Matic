#import "@preview/suiji:0.3.0"


#let quiz(
  body
) = {
  set page(
    margin: (
    top: 60pt,
    bottom: 60pt,
    left: 40pt,
    right: 40pt,
    ),
  )

  set heading(numbering: "I.")
  set text(size: 12pt)
  show heading.where(level: 1): set text(size: 22pt)
  show heading.where(level: 2): set text(size: 16pt)

  body
}

#let exercise(
  title,
  body,
) = {
  heading(level: 1, {
    //context counter(heading).get()
    title
  })
  body
}

#let answer(
  body,
) = {
  set text(fill: green)

  [ #body <answer> ]
}

#let index = state("exercise-index", 1)

#let input(
  points,
  label,
  expected,
) = [
  #label <label>

  #grid(
    columns: (auto, auto, auto),
    gutter: 2pt,

    box(
      fill: black,
      stroke: (
        paint: black,
        thickness: 2pt,
      ),
      inset: (
        top: 4pt,
        bottom: 4pt,
        left: 4pt,
        right: 4pt,
      ),

      text(fill: white, [\# #context index.get()])
    ),

    [
      #box(
        width: 100%,
        stroke: (
          paint: black,
          thickness: 2pt,
        ),
        inset: (
          top: 12pt,
          bottom: 12pt,
          left: 12pt,
          right: 12pt,
        ),

        {
          answer(expected)
        }
      ) <input-body>
    ],

    box(
      fill: black,
      stroke: (
        paint: black,
        thickness: 2pt,
      ),
      inset: (
        top: 4pt,
        bottom: 4pt,
        left: 4pt,
        right: 4pt,
      ),

      text(fill: white, [\/ #points])
    ),

    context index.update(x => x + 1)

  ) <input>
]

#let hint(
  body,
) = {
  block(
    stroke: orange,
    width: 100%,
    inset: (
      top: 12pt,
      bottom: 12pt,
      left: 12pt,
      right: 12pt,
    ),

    {
      set text(fill: orange)

      "💡"
      h(6pt)
      body
    }
  )
}

#let var(
  body,
) = {
  text(
    fill: blue,
    weight: "semibold",
    [#body],
  )
}

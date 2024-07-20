// code=T_PLN
// name=Plain
// description=Default print-friendly theme.
// tags=plain,print-friendly,bw

#let apply(
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

  show heading.where(level: 1): set heading(numbering: "I.")
  show heading.where(level: 1): set text(size: 22pt)

  show heading.where(level: 2): set heading(numbering: "1 |")
  show heading.where(level: 2): set text(size: 14pt)

  set text(size: 12pt)

  show emph: it => {
    text(
      fill: blue,
      weight: "semibold",
      it.body,
    )
  }

  body
}

#let exercise(
  title,
  body,
) = {
  heading(
    level: 1,
    title,
  )
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


// Preview.
#{
  show: apply

  exercise(
    "Joe's paradox",
    [
      _Joe_ goes to the beach with his _2 sisters_.
      #input(1,
        [Why?],
        [Anyone's guess],
      )
      _Joe_ comes back empty-handed.
      #input(1,
        [How many _sisters_ are left?],
        block[$ 2 - 2 = 0 $],
      )
    ]
  )

  exercise(
    "Other Exercise",
    [
      #lorem(24)
      == Sub-title
      #lorem(24)
      == Sub-title
      #lorem(24)
    ]
  )
}

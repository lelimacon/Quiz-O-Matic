#import "@preview/suiji:0.3.0"


#let quiz(
  margin-vertical: 40pt,
  margin-horizontal: 20pt,
  body
) = {
  set page(
    margin: (
      top: margin-vertical,
      bottom: margin-vertical,
      left: margin-horizontal,
      right: margin-horizontal,
    ),
  )

  set heading(numbering: "1.")
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
  set text(fill: green, size: 1.4em)

  body
}

#let input(
  height: auto,
  label,
  expected,
) = {
  //set text(weight: "bold")

  label

  box(
    width: 100%,
    height: height,
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
  )
}

#let hint(
  body,
) = {
  block(
    stroke: blue,
    width: 100%,
    inset: (
      top: 12pt,
      bottom: 12pt,
      left: 12pt,
      right: 12pt,
    ),

    {
      set text(fill: blue)

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

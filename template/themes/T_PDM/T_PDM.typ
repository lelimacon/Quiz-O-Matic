#import "../../utils.typ": *


#let state-index = state("exercise-index", 1)


#let image-mouse-head = image("mouse-head-1.svg", height: 100pt)
#let image-mouse-sitting = image("mouse-sitting-1.svg", width: 140pt)


#let header(
  options,
  title,
  length,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      bottom: 1pt + black,
    ),

    [
      #text(font: "Luckiest Guy", title)
      #h(1fr)
      #length minutes
    ]
  )
}

#let footer(
  options,
  title,
) = {
  set text(weight: "bold")

  block(
    width: 100%,
    height: 100%,
    inset: 6pt,
    stroke: (
      top: 1pt + black,
    ),

    [
      #text(font: "Luckiest Guy", title)
      #h(1fr)
      #counter(page).display(
        "1/1",
        both: true,
      )
    ]
  )
}

#let cover(
  options,
  length,
  title,
  subtitle,
  date,
) = {
  block(height: 60pt)

  box(
    width: 100%,
    stroke: (
      top: (
        paint: black,
        thickness: 2pt,
      ),
      bottom: (
        paint: black,
        thickness: 1pt,
      ),
    ),
    inset: (
      top: 12pt,
      bottom: 28pt,
      //left: 12pt,
      //right: 12pt,
    ),

    [
      #place(
        dx: 0pt,
        dy: -11pt,
        top + center,

        box(
          width: 100%,
          height: 6pt,
          stroke: (
            bottom: (
              paint: black,
              thickness: 1pt,
            ),
          ),
          fill: options.primary-color,
        )
      )

      #place(
        dx: -4pt,
        dy: -108pt,
        top + center,

        image-mouse-sitting,
      )

      #grid(
        columns: (auto, auto, auto),

        text(
          size: 12pt,
          weight: "semibold",
          date
        ),
        box(width: 100%),
        text(
          size: 12pt,
          weight: "semibold",
          [#length minutes]
        )
      )

      #set align(center)

      #set text(font: "Luckiest Guy")

      #block(text(
        size: 32pt,
        weight: "extrabold",
        fill: options.primary-color,
        stroke: black,
        smallcaps(title)
      ))

      #block(text(
        size: 20pt,
        weight: "light",
        fill: options.primary-color.lighten(20%),
        smallcaps(subtitle)
      ))
    ]
  )
}

#let exercise(
  options,
  points,
  title,
  body,
) = {
  let polkaPattern = pattern(size: (12pt, 12pt))[
    #place(dx: 2pt, dy: 8pt, top + left, circle(radius: 1.6pt, fill: options.primary-color))
    #place(dx: 8pt, dy: 2pt, top + left, circle(radius: 1.6pt, fill: options.primary-color))
  ]

  grid(
    columns: (auto, auto, auto, auto),
    align: horizon,
    gutter: 6pt,

    box(
      width: 100%,
      height: 18pt,
      fill: polkaPattern,

      place(
        dx: 0pt,
        dy: 24pt,
        top + left,

        text(
          size: 12pt,
          weight: "semibold",
          [Exercise #(context counter(heading).get().at(0) + 1)]
        )
      )
    ),
    //context counter(heading).get(),
    heading(
      level: 1,
      [
        //#circle(
        //  stroke: 2pt + red,
        //  context counter(heading).display()
        //),
        //--
        #title
      ]
    ),
    //box(width: 10pt),
    box(
      width: 100%,
      height: 18pt,
      fill: polkaPattern,

      place(
        dx: 0pt,
        dy: 24pt,
        top + right,

        text(
          size: 12pt,
          weight: "semibold",
          [#points points]
        )
      )
    ),
    //grid.cell(
    //  align: right,
    //)[
    //  #box(
    //    width: 100%,
    //    height: 10pt,
    //    fill: red,
    //  )
    //  #text(
    //    size: 12pt,
    //    weight: "semibold",
    //    [#points points]
    //  )
    //]
  )
  block(height: 0pt)

  body
}

#let answer(
  options,
  body,
) = {
  set text(fill: green)

  [ #body <answer> ]
}

#let points-as-hearts(
  points,
) = {
  range(int(points)).map(_ => "♥").join()
  let remainder = calc.rem(points, 1)
  if (remainder > 0.1 and remainder < 0.9) {
    box(
      width: (8 * remainder) * 1pt,
      clip: true,
      align(left, "♥")
    )
  }
}

#let input(
  options,
  points,
  label,
  expected,
) = [
  #block(
    width: 100%,
    stroke: (
      paint: gray,
      thickness: 1pt,
    ),
    inset: (
      top: 24pt,
      bottom: 12pt,
      left: 8pt,
      right: 8pt,
    ),

    [
      // Input counter.
      #place(
        dx: 0pt,
        dy: -18pt,
        top + left,

        text(
          size: 10pt,
          fill: options.secondary-color,
          weight: "bold",

          [
            Q#context state-index.get()
          ]
        )
      )

      // Input score.
      #place(
        dx: 0pt,
        dy: -18pt,
        top + right,

        text(
          size: 10pt,
          fill: options.secondary-color,
          weight: "bold",

          points-as-hearts(points)
        )
      )

      #text(weight: "bold", label) <input-label>
      #answer(options, expected) <input-body>
    ]
  ) <input>
  #context state-index.update(x => x + 1)
]

#let input-inline(
  options,
  points,
  label,
  expected,
) = [
  #box(
    baseline: 12pt,
    inset: (
      top: 2pt,
      bottom: 8pt,
      //left: 2pt,
      //right: 2pt,
    ),
    [
      // Input counter.
      #place(
        dx: 0pt,
        dy: 10pt,
        bottom + left,

        text(
          size: 10pt,
          fill: options.secondary-color,
          weight: "bold",

          [
            Q#context state-index.get()
          ]
        )
      )

      // Input score.
      #place(
        dx: 0pt,
        dy: 10pt,
        bottom + right,

        text(
          size: 10pt,
          fill: options.secondary-color,
          weight: "bold",

          points-as-hearts(points)
        )
      )

      // Underlined input.
      #box(
        stroke: (
          bottom: (
            paint: options.secondary-color,
            thickness: 1pt,
          ),
        ),
        inset: (
          //top: 2pt,
          bottom: 4pt,
          left: 2pt,
          right: 2pt,
        ),
        [
          #text(label) <input-label>
          #box(inset: (left: 3pt, right: 3pt), answer(options, expected)) <input-body>
        ]
      )
    ]
  ) <input>
  //
  #context state-index.update(x => x + 1)
]

#let hint(
  options,
  body,
) = {
  let minSize = 0pt
  let vMargin = 6pt

  set text(fill: options.secondary-color)

  box(
    width: 100%,
    stroke: (
      paint: options.secondary-color,
      thickness: 1pt,
    ),
    inset: (
      left: 40pt,
      right: 12pt,
    ),
    [
      #place(
        dx: -86pt,
        dy: 20pt,
        bottom + left,

        image-mouse-head,
      )

      #context(block(height: calc.max(0pt, minSize - measure(body).height + vMargin) / 2))

      #body

      #context(block(height: calc.max(0pt, minSize - measure(body).height + vMargin) / 2))
    ]
  )
}


#let apply(
  options: none,
  title: "",
  length: "",
  body,
) = {
  // Load default options.
  let options = if options != none { options } else { toml("T_PDM.toml").defaults }

  // Parse colors.
  let options = (
    primary-color: rgb(options.primaryColor),
    secondary-color: rgb(options.secondaryColor),
  )

  set page(
    margin: (
      top: 60pt,
      bottom: 60pt,
      left: 56pt,
      right: 56pt,
    ),
    header: context {
      if counter(page).get().first() > 1 {
        header(options, title, length)
      }
    },
    footer: footer(options, title),
  )

  show heading.where(level: 1): set heading(numbering: "A")
  show heading.where(level: 1): it => [
    #set align(center)
    #set text(
      size: 20pt,
      fill: options.primary-color,
      font: "Luckiest Guy",
    )

    // Hide numbering.
    #it.body
  ]

  show heading.where(level: 2): set text(
    size: 14pt,
    fill: options.primary-color,
    font: "Luckiest Guy",
  )

  set text(font: "Quicksand")

  set text(
    size: 12pt,
  )

  show emph: it => {
    text(
      fill: options.secondary-color,
      weight: "semibold",
      it.body,
    )
  }

  show figure.caption: it => [
    #text(weight: "semibold", it.body)
  ]

  set list(marker: ([👉], [--], [▪]))

  show <q-cover>: it => {
    let length = it.children.at(0).body
    let title = it.children.at(1).body
    let subtitle = it.children.at(2).body
    let date = it.children.at(3).body
    cover(options, length, title, subtitle, date)
  }

  show <q-exercise>: it => {
    let points = int(content-to-string(it.children.at(0).body))
    let title = it.children.at(1).body
    let body = it.children.at(2).body
    exercise(options, points, title, body)
  }

  show <q-answer>: it => {
    let body = it.children.at(0).body
    answer(options, body)
  }

  show <q-input>: it => {
    let points = float(content-to-string(it.children.at(0).body))
    let label = it.children.at(1).body
    let expected = it.children.at(2).body
    input(options, points, label, expected)
  }

  show <q-input-inline>: it => {
    let points = float(content-to-string(it.children.at(0).body))
    let label = it.children.at(1).body
    let expected = it.children.at(2).body
    input-inline(options, points, label, expected)
  }

  show <q-hint>: it => {
    let body = it.children.at(0).body
    hint(options, body)
  }

  body
}


// Preview.
#let preview() = {
  import "../../demo/dummy-quiz.typ" as dummy

  let metadata = toml("T_PDM.toml")

  show: apply.with(
    options: metadata.defaults,
    title: "Preview",
    length: 20,
  )

  dummy.generate()
}

// Keep commented to avoid breaking imports.
//#preview()

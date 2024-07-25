// code=T_PDM
// name=Public Domain Mouse
// description=Public domain Mickey Mouse (Steamboat Willie).
// tags=color
// assets=mouse-head-1.svg,mouse-sitting-1.svg

#let state-index = state("exercise-index", 1)


#let image-mouse-head = image("mouse-head-1.svg", height: 100pt)
#let image-mouse-sitting = image("mouse-sitting-1.svg", width: 140pt)


#let header(
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
      #title
      #h(1fr)
      #length minutes
    ]
  )
}

#let footer(
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
      #title
      #h(1fr)
      #counter(page).display(
        "1/1",
        both: true,
      )
    ]
  )
}

#let cover(
  length: "",
  title: "",
  subtitle: "",
  date: "",
  body,
) = {
  set page(
    header: context {
      if counter(page).get().first() > 1 {
        header(title, length)
      }
    },
    footer: footer(title),
  )

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
          fill: red,
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

      #block(text(
        size: 32pt,
        weight: "extrabold",
        fill: red,
        stroke: black,
        smallcaps(title)
      ))

      #block(text(
        size: 20pt,
        weight: "light",
        fill: red.lighten(20%),
        smallcaps(subtitle)
      ))
    ]
  )

  body
}

#let apply(
  options: (),
  body,
) = {
  let primary-color = rgb(options.primaryColor)
  let secondary-color = rgb(options.secondaryColor)

  set page(
    margin: (
      top: 60pt,
      bottom: 60pt,
      left: 56pt,
      right: 56pt,
    ),
  )

  show heading.where(level: 1): set heading(numbering: "A")
  show heading.where(level: 1): it => [
    #set align(center)
    #set text(
      size: 20pt,
      fill: primary-color,
    )

    // Hide numbering.
    #it.body
  ]

  show heading.where(level: 2): set text(
    size: 14pt,
    fill: primary-color,
  )

  set text(
    size: 12pt,
  )

  show emph: it => {
    text(
      fill: secondary-color,
      weight: "semibold",
      it.body,
    )
  }

  show <t-label>: set text(fill: secondary-color, weight: "bold")
  //show <t-input-outline>: set box(
  //  stroke: (
  //    paint: gray,
  //  )
  //)
  show <t-inline-input-outline>: it => {
    //set box(
    //  stroke: (
    //    paint: gray,
    //  )
    //)
    box(
      stroke: (
        bottom: (
          paint: secondary-color,
          thickness: 1pt,
        ),
      ),
      inset: (
        //top: 2pt,
        bottom: 4pt,
        left: 2pt,
        right: 2pt,
      ),
      it.body
    )
  }
  show <t-test>: it => {
    //it.fields()
    let a = it.children.at(0)
    let b = it.children.at(1)
    [ #a -- #b ]
  }

  body
}

#let exercise(
  points,
  title,
  body,
) = {
  let polkaPattern = pattern(size: (12pt, 12pt))[
    #place(dx: 2pt, dy: 8pt, top + left, circle(radius: 1.6pt, fill: red))
    #place(dx: 8pt, dy: 2pt, top + left, circle(radius: 1.6pt, fill: red))
  ]

  grid(
    columns: (auto, auto, auto, auto),
    align: horizon,
    gutter: 6pt,

    box(
      width: 100%,
      height: 20pt,
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
      height: 20pt,
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
  body,
) = {
  set text(fill: green)

  [ #body <answer> ]
}

#let input(
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
          [
            Q#context state-index.get()
          ]
        )
      ) <t-label>

      // Input score.
      #place(
        dx: 0pt,
        dy: -18pt,
        top + right,

        text(
          size: 10pt,
          range(points).map(_ => "♥").join()
        )
      ) <t-label>

      #text(weight: "bold",
        [
          #label <label>
        ]
      )

      #answer(expected) <input-body>
    ]
  ) <input>
  #context state-index.update(x => x + 1)
]

#let input-inline(
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
      //#grid(
      //  [toto],
      //  [tata],
      //) <t-test>

      // Input counter.
      #place(
        dx: 0pt,
        dy: 10pt,
        bottom + left,

        text(
          size: 10pt,
          [
            Q#context state-index.get()
          ]
        )
      ) <t-label>

      // Input score.
      #place(
        dx: 0pt,
        dy: 10pt,
        bottom + right,

        text(
          size: 10pt,
          range(points).map(_ => "♥").join()
        )
      ) <t-label>

      // Underlined input.
      #box(
        [
          #(text(label)) <label>
          #box(inset: (left: 3pt, right: 3pt), answer(expected)) <input-body>
        ]
      ) <t-inline-input-outline>
    ]
  ) <input>
  #context state-index.update(x => x + 1)
]

#let hint(
  body,
) = {
  let minSize = 0pt
  let vMargin = 6pt

  set text(fill: blue)

  box(
    width: 100%,
    stroke: (
      paint: blue,
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


// Preview.
#let preview() = {
  import "../../demo/dummy-quiz.typ" as dummy

  let metadata = toml("T_PDM.toml")

  show: apply.with(
    options: metadata.defaults
  )

  dummy.generate((
    cover: cover,
    exercise: exercise,
    input: input,
    input-inline: input-inline,
    hint: hint,
  ))
}

// Keep commented to avoid breaking imports.
//#preview()

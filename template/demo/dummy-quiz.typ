#import "../builder.typ" as builder


#let generate(
) = {

  builder.cover(
    length: 20,
    title: [Dummy Quiz],
    subtitle: [
      A quirky quiz for theme testing that contains a few weird use cases.
      This title for one. And more.
    ],
    date: datetime.today().display(),
  )

  builder.exercise(
    5,
    "Joe's paradox",
    [
      _Joe 🧔_ goes to the beach with his _3 sisters 👧_.
      #builder.input(2,
        [Why?],
        [
          Anyone's guess.\
          ...\
          Keep guessing.
        ],
      )
      _Joe_ comes back empty-handed.
      #builder.input(3,
        [How many _sisters_ are left?],
        block[$ 3 - 3 = 0 $],
      )
    ]
  )

  builder.exercise(
    15,
    "Subject Soups and Useless Hints, among Other Delicacies",
    [
      #lorem(24)
      #builder.hint[
        Read between the lines.
        The answer lies within.
        #lorem(24)
      ]

      == Math soup
      #grid(
        columns: (auto, auto, auto),
        align: horizon,
        gutter: 6pt,

        {
          builder.input(1,
            box(height: 34pt)[$ 5! $],
            box($ 120 $),
          )
        },
        {
          builder.input(1,
            box(height: 34pt)[$ \l\c\m(3, 40) $],
            box[$ 120 $],
          )
        },
        {
          builder.input(1,
            box(height: 34pt)[$ sum_(k=0)^15 k $],
            box[$ 120 $],
          )
        }
      )
      #grid(
        columns: (auto, auto, auto),
        align: horizon,
        gutter: 6pt,

        {
          builder.input(1,
            box(height: 34pt)[$ -x^2+80x+4800 = 0 $],
            box($ 120 $),
          )
        },
        {
          builder.input(1,
            box(height: 34pt)[$ root(1, 120) $],
            box[$ 120 $],
          )
        },
        {
          builder.input(2,
            box(height: 34pt)[$ integral_1^2 32x^3 dif x $],
            box[$ 120 $],
          )
        }
      )

      == English soup
      Action #builder.input-inline(1, [🙊], [speaks]) louder than words.
      Children should be #builder.input-inline(1, [🙈], [seen]) and not #builder.input-inline(1, [🙉], [heard]).
      Flattery, like perfume, should #builder.input-inline(1, [be], [smelled]) but not swallowed.
      A good #builder.input-inline(1, [], [listener]) is a silent flatterer.
      As #builder.input-inline(2, [], [snug]) as a bug.
      An #builder.input-inline(1, [🍎], [apple]) a day keeps the doctor away.
    ]
  )
}

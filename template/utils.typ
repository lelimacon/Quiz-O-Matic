#import "@preview/suiji:0.3.0"


#let array-take(indices, array, startAt: 0) = {
  return array
    .enumerate()
    .filter(e => (e.at(0) + startAt) in indices)
    .map(e => e.at(1))
}

#let f(
  // Show variable.
  variable: false,
  // Entity count.
  n: 1,
  // Show count or article.
  prefix: none, // "count" | "article"
  // Show emoji.
  emoji: false,
  entity,
) = {
    let s-main = ""
    let s-article = ""
    let s-emoji = ""

    if (entity.type == "person") {
      s-main = entity.name
    }
    else {
      if (prefix == "count") {
        s-main = [#n ]
      }
      else if (prefix == "article") {
        s-article = [#entity.article ]
      }

      if (n == 1) {
        s-main = s-main + entity.singular
      }
      else {
        s-main = s-main + entity.plural
      }
    }

    if (emoji) {
      s-emoji = [ #entity.emoji]
    }

    if (variable) {
      return {s-article;emph({s-main;s-emoji})}
    }
    else {
      return {s-article;s-main;s-emoji}
    }
}

#let f-vae(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "article", emoji: true, entity)

#let f-ae(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "article", emoji: true, entity)

#let f-a(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "article", emoji: false, entity)

#let f-va(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "article", emoji: false, entity)

#let f-v(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: none, emoji: false, entity)

#let f-vce(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "count", emoji: true, entity)

#let f-ce(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "count", emoji: true, entity)

#let f-c(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: "count", emoji: false, entity)

#let f-vc(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: "count", emoji: false, entity)

#let f-e(
  n: 1,
  entity,
) = f(variable: false, n: n, prefix: none, emoji: true, entity)

#let f-ve(
  n: 1,
  entity,
) = f(variable: true, n: n, prefix: none, emoji: true, entity)

#let subject(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "m") { return "he" }
      else { return "she" }
    }
    else { return "the" }
}

#let object(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "m") { return "him" }
      else { return "her" }
    }
    else { return "its" }
}

#let possessive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "m") { return "his" }
      else { return "her" }
    }
    else { return "its" }
}

#let independent-possessive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "m") { return "his" }
      else { return "hers" }
    }
    else { return "its" }
}

#let reflexive(entity) = {
    if (entity.type == "person") {
      if (entity.sex == "m") { return "himself" }
      else { return "herself" }
    }
    else { return "itself" }
}


#let up(str) = str.replace(count: 1, regex("^\w"), m => upper(m.text))


#let content-to-string(content) = {
  if content.has("text") {
    if type(content.text) == "string" {
      return content.text
    }
    return content-to-string(content.text)
  }
  if content.has("children") {
    return content.children
      .map(content-to-string)
      .join("")
  }
  if content.has("child") {
    return content-to-string(content.child)
  }
  if content.has("body") {
    return content-to-string(content.body)
  }
  if content == [ ] {
    return " "
  }
}

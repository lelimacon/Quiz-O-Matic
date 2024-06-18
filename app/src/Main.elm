module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = \_ -> Sub.none
    }


type alias Model =
  { content : String
  }


init : () -> ( Model, Cmd Msg )
init _ =
  ( { content = "toto" }
  , Cmd.none
  )


type Msg
  = ContentChanged String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    ContentChanged content ->
      ( { model | content = content }
      , Cmd.none
      )


view : Model -> Html Msg
view model =
  div [ class "container" ]
    [ div [ class "aside" ] [
      textarea
        [ placeholder "Document content"
        , value model.content
        , onInput ContentChanged
        ] []
    ]
    , div [ class "preview" ] [
      node "typst-view"
        [ attribute "content" model.content ]
        []
      ]
    ]

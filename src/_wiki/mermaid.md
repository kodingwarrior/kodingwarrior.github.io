---
title: Mermaid
date:  2023-11-20
layout: wiki
tags: prelude
---

## Flowchart

<%= render(Mermaid.new) do %>
flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
<% end %>

## Class diagram

<%= render(Mermaid.new) do  %>
classDiagram
    class Animal
    Vehicle <|-- Car
<% end %>

## State diagram

<%= render(Mermaid.new) do %>
---
title: Simple sample
---
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
<% end %>


## Git Commit Diagram


<%= render(Mermaid.new) do %>
---
title: Example Git diagram
---
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
<% end %>

## Mindmap

<%= render(Mermaid.new) do  %>
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
<% end %>

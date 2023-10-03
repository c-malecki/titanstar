# TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000

## Theory craft, build, and share your favorite TitanStar Legends loadouts fast and easy

Some blurb

Check it out at someNetlifyDeploymentLink

### To Run Locally

#### Prequisites

- [Node.js](https://nodejs.org/en/download/current)

#### Clone Git Repository

```
git clone https://github.com/c-malecki/titanstar.git
```

#### Launch Client Application

```
cd titanstar
npm i
npm run dev
```

### Tech Spec

The client application is built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/). Styling is implemented with plain ol' CSS with the exception of calculating sprite sheet mapping. No additional libraries are used.

#### Component Architecture

- `App.tsx` — Simply acts as the page container, applying the background image and constraining the app to the center of the view port and adjusting margins.
- `Calculator.tsx` — Where the main application state and the functions for updating state live.
- `TalentPathGrid.tsx` — Controls the layout of the talent path UI, switches sprite sheet mapping for talent icons, and controls CSS classes based on stateful conditions.

### Difficulties I personally encountered

- Layout containers and how to compartmentalize responsive control. Entire app or calculator as grid vs only the talent paths as grids? Flexible and scalable layout that would allow for neatly introducing more Talent Paths? How to handle reponsiveness for a very natural horizontal layout when in a smaller viewport (switch Talent Paths to vertical orientation and stack horizontally, with additional Talent Paths being moved to a new row below?)
- Figuring out the right CSS to make the half gradient styling of the icon borders

### Additional features or enhancements I would do

- Lots of CSS animation opportunities. Faint blue pulsating while hovering over talent that can be allocated. A border trace and fill animation when a point is allocated. For sequential talents, spark that travels across connecting branch UI and then does the trace and fill animation.
- Fix up container and responsive CSS to cleanly handle additional talent paths.
- In-app persistence for saving different load outs.

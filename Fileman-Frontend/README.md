# FilemanFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

## UI conventions (Fileman redesign)

The look of the app comes from the "Fileman Redesign" design system (colours, type, spacing, components with usage notes).

- `src/styles/tokens.css`: every colour, size and font as a CSS variable, generated from the design system's tokens. Change values there (and in the design system), never as literals in components.
- `src/styles/fileman.css`: the shared component classes (prefix `fm-`), the same as the design system's `bundle.css`, plus a few app-only additions at the end.
- `src/app/components/ui/`: `<fileman-icon name="…">` (inline SVG icons, names in `Icon` in `fileman-constants.ts`), the confirmation dialog host and the success-message (toast) host.
- `FilemanDialogService.confirm(...)` / `.alert(...)` replace `window.confirm` / `window.alert`; `FilemanToastService.success(...)` confirms finished actions.
- Generated sections (between the "generated: Do not modify manually!" markers) come from the MOGLiCC templates in `dev-tools/MOGLiCC/workspaces/fileman/input`, which produce the new markup.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Create Component

## Rules

1. Do not add new dependencies.

2. Do not use device emojis.

## Component Scope

Consider whether the requested component should be "generic" or "specific" and
determine which is more appropriate.

### Examples of Generic Components

1. Components that do not include special props and can be used across the
   entire application.

2. Dedicated providers, such as Redux or NextTheme, that should be rendered at
   the top-level `layout.tsx`.

3. Components placed within `@/components/**`.

### Examples of Specific Components

1. Components that require special props.

2. Components that are not used or cannot be used throughout the entire
   application.

3. Components where data fetching is or should be performed within the
   component.

4. Components that are or should be server-rendered.

## Style

1. Check [globals.css](/packages/ui/src/styles/globals.css) to understand the
   project's theme colors.

2. Ensure responsiveness is always supported.

3. Always support themes (e.g., Light, Dark).

## Placement

1. Consider the specific scope of the component being created:
   - Generic components that serve as the **basis for extensions**: Inside
     `@/components/**`.
   - Generic components that are **not extended** and used throughout
     `@/app/**`: Inside `@/apps/components/**`.
   - Practical components used **only for a single page** in `@/app/**`: Inside
     `@/apps/components/**`.
   - Practical shared components used by a **specific group** in `@/app/**`:
     - Example: Background components shared between
       `@/app/(auth)/signin/layout.tsx` and `@/app/(auth)/signup/layout.tsx`.

2. Place the component in the most appropriate location based on its specific
   scope:
   - Generic components serving as the basis for extensions: `@/components/**`
   - Generic components not extended: `@/apps/components/**`
   - Practical components: `@/apps/components/**`
   - Practical shared components: `@/app/(**)/components/**`

3. Check if similar components have already been implemented based on the
   component's target scope:
   - For generic components: `@/app/**/components/**`
   - For specific components: `@/components/**`

## Implementing Components

1. Unless there is a special reason, extend components prepared in
   `@workspace/ui/components/**` for implementation.
   - If a component is not prepared, check the available components at
     [this URL](https://ui.shadcn.com/docs/components) by fetching it.
   - If the base-purpose component is included in the available components but
     not yet set up, run `cd packages/ui && yarn shadcn add {component}` to set
     it up.

2. Implement the target component using the setup component.
   - Clearly specify the boundaries at the beginning of the file with either
     "use client" or "use server".

# Coding Guidelines

## General Rules

### Software principles that need to be kept in mind

1. DRY (Don't Repeat Yourself)
2. SOLID (SRP, OCP, LSP, ISP, DIP)
3. KISS (Keep It Simple, Stupid)
4. SRP (Single Responsibility Principle)
5. YAGNI (You Aren't Gonna Need It) vs OCP (Open/Closed Principle)
6. LSP (Liskov Substitution Principle)
7. ISP (Interface Segregation Principle)
8. DIP (Dependency Inversion Principle)
9. Clean Code

### Variable definition

1. Always use `const` for immutable values and never use `var`.

### Type definition

1.  Prefer using `interface` over `type`.
2.  Use `type` for defining union types or tuple types.

### Function definition

1. Favor the use of arrow functions when defining functions.

### Export style:

1. Always prefer named exports over default exports.

### Iterative process

1. Use `for` loops for performance-critical scenarios.
2. Use `map` methods for improving readability.
3. Use `for` loops when control structures are needed.

### Conditional branch

1.  Prefer early returns instead of excessive use of `else` or `else if`.
2.  Use `switch` statements when handling multiple conditions at once.

## React component

### General Rules

1. Add "use client" directive at the top

   ```tsx
   "use client";

   import { type FC, type ReactNode } from "react";

   // ... implementation
   ```

2. Always define types

   ```tsx
   "use client";

   import { type FC, type ReactNode } from "react";
   import { cn } from "@workspace/ui/lib/utils";

   export interface ComponentProps {
     className?: string;
     children?: ReactNode;
   }

   export const Component: FC<ComponentProps> = ({ className, children }) => {
     return <div className={cn(className)}>{children}</div>;
   };
   ```

3. Basically, always merge and organize `className` using `cn`

   ```tsx
   "use client";

   import { type FC, type ReactNode } from "react";
   import { cn } from "@workspace/ui/lib/utils";

   export interface ComponentProps {
     className?: string;
     children?: ReactNode;
   }

   export const Component: FC<ComponentProps> = ({ className, children }) => {
     return (
       <div
         className={cn(
           "p-0", // base
           "sm:p-1", // sm
           "md:p-2", // md
           "lg:p-3", // lg
           "xl:p-4", // xl
           className,
         )}
       >
         {children}
       </div>
     );
   };
   ```

### Component Scope

1. Components that do not include special props and can be used throughout the
   application should be created in `@/components/**`.

2. Dedicated providers that should be rendered in the top-level `layout.tsx`,
   such as Redux or NextTheme, should be created in
   `@/components/Providers/*.tsx`.

3. If special `props` are required, create the component in
   `app/**/components/**/*.tsx` or `app/**/components/*.tsx`.

## Tailwind css

1. Do not modify [globals.css](../../packages/ui/src/styles/globals.css).
2. Do not modify [tailwind.config.js](../../tailwind.config.js).

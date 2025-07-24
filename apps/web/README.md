# Web Application

## Contents

- [Structure](#structure)

## Structure

This table shows the structure of the application and its roles.

| Package name | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| app          | Manages the overall UI and route structure of the application.        |
| components   | Contains a collection of components shared across the application.    |
| lib          | A directory for common utility functions and libraries.               |
| middleware   | Stores middleware used in the application.                            |
| store        | Includes configuration and logic for state management.                |
| tests        | Contains test-related configurations and scripts, e.g., jest.setup.js |
| types        | Manages TypeScript type definitions.                                  |

## Advanced State Management

By using `useAppSelector` and `useAppDispatch`, you can prevent the need for
prop drilling and manage state in a more advanced way.

For details, refer to the implementation of [ReduxStore](./src/store/index.ts) and [Slices](./src/store/slices/counter.ts).

Example:

```tsx
'use client';

import { Button } from '@workspace/ui/components/button';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment } from '@/store/slices/counter';

export const Counter = () => {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handleClick = {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };

  return (
    <>
      <p>{counter.value}</p>
      <Button onClick={handleClick.increment}>+</Button>
      <Button onClick={handleClick.decrement}>-</Button>
    </>
  );
};
```

'use client';

import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  setCurrentPiece,
  setBoard,
  setStatus,
  setKeys,
  setHoldPiece,
  setHold,
  addScore,
  clearLines,
  spawnPiece,
  setLastDrop,
} from '@/store/slices/tetris';
import { getPieceShape } from '@/store/slices/tetris';
import { movePiece, rotatePiece, hardDrop, placePiece, isGameOver } from '../utils/gameLogic';

export const useGameEngine = () => {
  const dispatch = useAppDispatch();
  const { board, currentPiece, nextPieces, holdPiece, canHold, status, fallSpeed, lastDrop, keys } = useAppSelector(
    (state) => state.tetris,
  );

  // Spawn initial piece
  useEffect(() => {
    if (status === 'playing' && !currentPiece && nextPieces.length > 0) {
      dispatch(spawnPiece());
    }
  }, [status, currentPiece, nextPieces.length, dispatch]);

  // Hold piece function
  const holdCurrentPiece = useCallback(() => {
    if (!currentPiece || !canHold) return;

    if (holdPiece) {
      // Create new piece with hold piece type at spawn position
      const newShape = getPieceShape(holdPiece, 0);
      const newPiece = {
        type: holdPiece,
        shape: newShape,
        position: { x: 4, y: 0 },
        rotation: 0,
      };

      dispatch(setHoldPiece(currentPiece.type));
      dispatch(setCurrentPiece(newPiece));
    } else {
      // Put current piece in hold and spawn next piece
      dispatch(setHoldPiece(currentPiece.type));
      dispatch(spawnPiece());
    }

    dispatch(setHold(false));
  }, [currentPiece, holdPiece, canHold, dispatch]);

  // Lock piece and spawn new one
  const lockPiece = useCallback(() => {
    if (!currentPiece) return;

    // Place piece on board
    const newBoard = placePiece(board, currentPiece);
    dispatch(setBoard(newBoard));
    dispatch(setCurrentPiece(null));

    // Check for game over
    if (isGameOver(newBoard)) {
      dispatch(setStatus('gameOver'));
      return;
    }

    // Clear completed lines
    dispatch(clearLines());

    // Spawn next piece
    dispatch(spawnPiece());
  }, [board, currentPiece, dispatch]);

  // Move piece
  const moveCurrentPiece = useCallback(
    (direction: 'left' | 'right' | 'down') => {
      if (!currentPiece || status !== 'playing') return;

      const newPiece = movePiece(board, currentPiece, direction);
      if (newPiece) {
        dispatch(setCurrentPiece(newPiece));

        // Add score for soft drop
        if (direction === 'down') {
          dispatch(addScore(1));
        }
      } else if (direction === 'down') {
        // Piece can't move down, lock it
        lockPiece();
      }
    },
    [board, currentPiece, status, dispatch, lockPiece],
  );

  // Rotate piece
  const rotateCurrentPiece = useCallback(() => {
    if (!currentPiece || status !== 'playing') return;

    const newPiece = rotatePiece(board, currentPiece);
    if (newPiece) {
      dispatch(setCurrentPiece(newPiece));
    }
  }, [board, currentPiece, status, dispatch]);

  // Hard drop piece
  const hardDropCurrentPiece = useCallback(() => {
    if (!currentPiece || status !== 'playing') return;

    const droppedPiece = hardDrop(board, currentPiece);
    const dropDistance = droppedPiece.position.y - currentPiece.position.y;

    // Place piece on board immediately
    const newBoard = placePiece(board, droppedPiece);
    dispatch(setBoard(newBoard));
    dispatch(setCurrentPiece(null));
    dispatch(addScore(dropDistance * 2));

    // Check for game over
    if (isGameOver(newBoard)) {
      dispatch(setStatus('gameOver'));
      return;
    }

    // Clear completed lines
    dispatch(clearLines());

    // Spawn next piece
    dispatch(spawnPiece());
  }, [board, currentPiece, status, dispatch]);

  // Gravity (automatic falling)
  useEffect(() => {
    if (status !== 'playing' || !currentPiece) return;

    const now = Date.now();
    if (now - lastDrop >= fallSpeed) {
      moveCurrentPiece('down');
      dispatch(setLastDrop(now));
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastDrop >= fallSpeed) {
        moveCurrentPiece('down');
        dispatch(setLastDrop(currentTime));
      }
    }, 16); // 60 FPS

    return () => clearInterval(interval);
  }, [status, currentPiece, fallSpeed, lastDrop, moveCurrentPiece, dispatch]);

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.code;

      // Allow pause key to toggle even when not currently 'playing'
      if (key === 'KeyP') {
        event.preventDefault();
        if (!keys.pause) {
          dispatch(setKeys({ pause: true }));
          if (status === 'paused') {
            dispatch(setStatus('playing'));
          } else {
            dispatch(setStatus('paused'));
          }
        }
        return;
      }

      if (status !== 'playing') return;

      switch (key) {
        case 'ArrowLeft':
        case 'KeyA':
          event.preventDefault();
          if (!keys.left) {
            dispatch(setKeys({ left: true }));
            moveCurrentPiece('left');
          }
          break;
        case 'ArrowRight':
        case 'KeyD':
          event.preventDefault();
          if (!keys.right) {
            dispatch(setKeys({ right: true }));
            moveCurrentPiece('right');
          }
          break;
        case 'ArrowDown':
        case 'KeyS':
          event.preventDefault();
          if (!keys.down) {
            dispatch(setKeys({ down: true }));
            moveCurrentPiece('down');
          }
          break;
        case 'ArrowUp':
        case 'KeyW':
          event.preventDefault();
          if (!keys.rotate) {
            dispatch(setKeys({ rotate: true }));
            rotateCurrentPiece();
          }
          break;
        case 'Space':
          event.preventDefault();
          if (!keys.drop) {
            dispatch(setKeys({ drop: true }));
            hardDropCurrentPiece();
          }
          break;
        case 'KeyC':
          event.preventDefault();
          if (!keys.hold) {
            dispatch(setKeys({ hold: true }));
            holdCurrentPiece();
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.code;

      switch (key) {
        case 'ArrowLeft':
        case 'KeyA':
          dispatch(setKeys({ left: false }));
          break;
        case 'ArrowRight':
        case 'KeyD':
          dispatch(setKeys({ right: false }));
          break;
        case 'ArrowDown':
        case 'KeyS':
          dispatch(setKeys({ down: false }));
          break;
        case 'ArrowUp':
        case 'KeyW':
          dispatch(setKeys({ rotate: false }));
          break;
        case 'Space':
          dispatch(setKeys({ drop: false }));
          break;
        case 'KeyC':
          dispatch(setKeys({ hold: false }));
          break;
        case 'KeyP':
          dispatch(setKeys({ pause: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [status, keys, moveCurrentPiece, rotateCurrentPiece, hardDropCurrentPiece, holdCurrentPiece, dispatch]);

  return {
    moveCurrentPiece,
    rotateCurrentPiece,
    hardDropCurrentPiece,
    holdCurrentPiece,
  };
};

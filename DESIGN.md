# Passwordle Design Document

## Overview

Passwordle is a web application that implements a unique "Forgot Password" flow using a Wordle-style game mechanic. Instead of traditional email-based password recovery, users must guess their password through an interactive word-guessing game.

## Core Features

### 1. Login Page

- Clean, modern interface with a professional design
- Input fields for username and password
- "Login" button
- "Forgot Password" link with "try me!" highlight
- Invalid credentials message for any login attempt

### 2. Passwordle Game

- Wordle-style interface
- No word length limitation
- Random password selection from commonPasswords list
- Visual feedback for correct/incorrect letter positions
- Game state persistence during the session

## Technical Architecture

### Frontend Stack

- React.js for the UI framework
- TypeScript for type safety
- Tailwind CSS for styling
- Local storage for game state management

### Components Structure

```
src/
├── components/
│   ├── LoginPage/
│   │   ├── LoginForm.tsx
│   │   └── styles.css
│   ├── PasswordleGame/
│   │   ├── GameBoard.tsx
│   │   ├── Keyboard.tsx
│   │   ├── GameRow.tsx
│   │   └── styles.css
│   └── common/
│       ├── Button.tsx
│       └── Input.tsx
├── data/
│   └── commonPasswords.ts
├── hooks/
│   └── useGameState.ts
└── utils/
    └── gameLogic.ts
```

## User Flow

1. **Initial Landing**

   - User arrives at the login page
   - Sees username/password form
   - Notices highlighted "Forgot Password" link

2. **Login Attempt**

   - User enters any credentials
   - System responds with "Invalid credentials" message
   - Form remains interactive

3. **Password Recovery**

   - User clicks "Forgot Password" link
   - System randomly selects a password from commonPasswords
   - Transitions to Passwordle game interface

4. **Passwordle Game**
   - User sees empty game board
   - Can input guesses of any length
   - Receives visual feedback for each guess
   - Game continues until correct password is guessed

## Data Structures

### Game State

```typescript
interface GameState {
  targetPassword: string;
  currentGuess: string;
  guesses: string[];
  gameStatus: "playing" | "won" | "lost";
  startTime: Date;
}
```

### Password List

```typescript
const commonPasswords: string[] = [
  // List of common passwords
  // Will be populated with real-world examples
];
```

## Game Mechanics

### Core Rules

- Maximum 6 attempts to guess the password
- Each guess must be a valid password from the commonPasswords list
- Feedback is provided after each guess
- Game ends when:
  - Correct password is guessed (win)
  - 6 incorrect attempts are made (loss)
  - User gives up (loss)

### Letter Feedback System

- Green (#538d4e): Letter is correct and in correct position
- Yellow (#b59f3b): Letter is in password but in wrong position
- Dark Gray (#3a3a3c): Letter is not in password
- Light Gray (#818384): Keyboard key state (used but incorrect)

### Grid Layout

- 6 rows (one for each attempt)
- Dynamic column width based on password length
- Each cell is 62px × 62px
- Cell border: 2px solid #3a3a3c
- Cell margin: 5px
- Grid centered on screen with max-width of 500px

### Keyboard Layout

- Dynamic keyboard layout based on characters in commonPasswords list
- Keys are arranged in rows of maximum 10 keys each
- Key size: 43px × 58px
- Key spacing: 6px
- Key colors:
  - Background: #818384
  - Text: #ffffff
  - Used keys follow the same color scheme as grid cells
- Special characters (if present in passwords) will be included
- Keys are arranged in order of frequency in the password list
- Example layout (if passwords contain letters, numbers, and special characters):
  ```
  Q W E R T Y U I O P
  A S D F G H J K L M
  Z X C V B N 1 2 3 4
  5 6 7 8 9 0 ! @ # $
  ```

### Keyboard Generation Logic

```typescript
interface KeyboardConfig {
  maxKeysPerRow: number;
  keySize: {
    width: number;
    height: number;
  };
  keySpacing: number;
}

function generateKeyboardLayout(passwords: string[]): string[][] {
  // Extract unique characters from passwords
  const uniqueChars = new Set(passwords.join("").split(""));

  // Sort characters by frequency in passwords
  const charFrequency = new Map<string, number>();
  passwords
    .join("")
    .split("")
    .forEach((char) => {
      charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
    });

  const sortedChars = Array.from(uniqueChars).sort((a, b) => (charFrequency.get(b) || 0) - (charFrequency.get(a) || 0));

  // Arrange characters into rows
  const rows: string[][] = [];
  let currentRow: string[] = [];

  sortedChars.forEach((char) => {
    if (currentRow.length >= 10) {
      rows.push(currentRow);
      currentRow = [];
    }
    currentRow.push(char);
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}
```

### Animations

1. Tile Flip Animation

   - Duration: 500ms
   - Easing: cubic-bezier(0.4, 0, 0.2, 1)
   - 3D rotation effect
   - Color transition on flip

2. Row Shake Animation

   - Duration: 600ms
   - Triggered on invalid guess
   - Horizontal shake with 5% displacement
   - Easing: cubic-bezier(.36,.07,.19,.97)

3. Keyboard Press Animation

   - Duration: 100ms
   - Scale down to 95%
   - Easing: cubic-bezier(0.4, 0, 0.2, 1)

4. Victory Animation
   - Duration: 1000ms
   - Bounce effect on winning row
   - Confetti effect on win
   - Modal popup with statistics

### Game States

1. Playing

   - Active input
   - Keyboard enabled
   - Submit button active

2. Processing

   - Disabled input
   - Loading animation
   - Disabled keyboard

3. Won

   - Victory animation
   - Statistics modal
   - Share button enabled

4. Lost
   - Game over modal
   - Reveal correct password
   - New game option

### Statistics Modal

- Games played
- Win percentage
- Current streak
- Best streak
- Guess distribution
- Share button
- Close button

### Share Format

```
Passwordle X/6
⬜⬜⬜⬜⬜⬜
⬜⬜⬜⬜⬜⬜
⬜⬜⬜⬜⬜⬜
⬜⬜⬜⬜⬜⬜
🟨🟨🟨🟨🟨⬜
🟩🟩🟩🟩🟩🟩
```

## UI/UX Guidelines

### Color Scheme

- Primary: #2196F3 (Blue)
- Success: #538d4e (Wordle Green)
- Warning: #b59f3b (Wordle Yellow)
- Error: #3a3a3c (Wordle Dark Gray)
- Background: #121213 (Wordle Dark)
- Text: #ffffff (White)
- Secondary Text: #818384 (Wordle Light Gray)
- Modal Background: rgba(0, 0, 0, 0.8)
- Modal Content: #121213

### Typography

- Font Family: Arial, Helvetica, sans-serif (matching Wordle)
- Headings: 16px, 700 weight
- Body: 16px, 400 weight
- Input: 16px, 700 weight
- Statistics: 16px, 400 weight
- Modal Title: 16px, 700 weight

### Spacing

- Container padding: 2rem
- Component spacing: 1rem
- Input height: 62px
- Button height: 48px
- Modal padding: 2rem
- Statistics grid gap: 1rem

## Security Considerations

- No actual password storage or verification
- All game logic runs client-side
- Random password selection for demonstration only
- No sensitive data transmission

## Future Enhancements

1. Difficulty levels
2. Statistics tracking
3. Share results functionality
4. Custom word lists
5. Multi-language support

## Development Guidelines

1. Mobile-first responsive design
2. Performance optimization
3. Clean code principles
4. Comprehensive error handling

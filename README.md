This project is a React app where we manage user data, a counter, and text editing features. 
Here's a breakdown of what each part does and how it's built:

1. App.js
The main App component brings all the components together.
It renders the Counter component for incrementing or decrementing a value, the
Userdata component to collect user information, and the Textedit component for saving
and displaying formatted text.
The app is styled using TailwindCSS and has a clean, responsive layout.

3. Userdata.js
The Userdata component is a simple form where users can fill in details like their
name, address, email, and phone number. We’re using React Hook Form to handle the form
and make validation a breeze. For state management, we rely on Redux Toolkit, which also
saves the data to localStorage, so even if the page reloads, the info stays put. Once the
user submits, the data is stored in both localStorage and the Redux store, ensuring it’s
always there ,even after a refresh.

5. Counter.js
The Counter component lets users easily increase or decrease a number,
and it keeps track of the count in localStorage, so it stays the same even
if the page reloads. The background color changes smoothly based on the count,
using React Spring, and it’s saved to localStorage too, so the color stays
consistent across sessions. Plus, both the count and the background color have
 smooth animations, making the app more fun and interactive.

7. Textedit.js
The Textedit component lets users view and edit saved data with some fun styling
 options like bold, italic, and font changes. Users can easily scroll through the
 saved text with "previous" and "next" buttons, and update the font styles on the
 fly. It saves the styled text in localStorage and uses Redux to manage the state.
 You can toggle bold, italic, and switch up the font family, and the styles are saved,
 so they can be applied to new text entries later.

9. Redux Toolkit and LocalStorage
Redux is used to manage the app's global state (like user data), and localStorage is
used for persisting data even when the app is reloaded. This combination ensures data
is always available and user interactions are maintained.

In summary:
This project is designed to manage a few pieces of data like a counter and the content of
a text editor. It uses React’s useState hook to manage these states. The data is then stored
in both Redux and localStorage, so even if you refresh the page, the data remains saved.

For the counter, it's pretty simple: you can increase, decrease, or reset the value,
and it's automatically saved to Redux and localStorage. This way, the counter value will
stay the same even after a page reload.

The text editor works similarly. The content typed in the editor is also stored using useState. 
As you type, the data updates in the state and is saved to both Redux and localStorage to persist
your input across sessions.

Instead of using separate useState calls for each piece of data, I used objects and the spread operator.
This makes the code cleaner and easier to manage, especially as the app grows.

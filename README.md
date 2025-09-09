


#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?

### What is the difference between var, let, and const?

* var is like a regular notebook, you can erase and write over the same page anytime.
* let is like a sticky note, you can change what's written on it, but you can't have another sticky note with the same label in the same area.
* const is like a tattoo, once it's on you, you can't change it.

### What is the difference between map(), forEach(), and filter()?

* forEach() is like reading a list of chores and doing each one, but you don't make a new list.
* map() is like having a list of ingredients and creating a new list of what you can bake with them.
* filter() is like looking at a list of your friends and only choosing the ones who live nearby to make a new list.

### What are arrow functions in ES6?
* They are a simple and shorter way to write functions in JavaScript, like a shortcut.

* (a, b) => a + b is the quick way to write function(a, b) { return a + b; }

### How does destructuring assignment work in ES6?
* It's a quick way to pull out specific items from a list or an object and give them their own names.

* List: const [first, second] = [1, 2]; // You get first = 1 and second = 2
* Object: const { name } = { name: 'Ali' }; // You get name = 'Ali'

### Explain template literals in ES6. How are they different from string concatenation?
* Template literals are strings with special powers, they let you put variables right inside them.
* Template literal: const name = 'Ali'; then Hello, ${name}! is much cleaner.
* Concatenation: const name = 'Ali'; then 'Hello, ' + name + '!' is messy.
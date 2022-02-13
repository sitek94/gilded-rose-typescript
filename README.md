# Gilded Rose Typescript

> 🚧 &nbsp; work in progress &nbsp;🚧

## Attempts

### 1. Violated Rules 🤦

Code: [attempt/1-violated-rules](https://github.com/sitek94/gilded-rose-typescript/tree/attempt/1-violated-rules)

The description says:

> (...) do not alter the Item class

And that's exactly what I did 🙈 I added `updateQuality` method to Item class, so that when `GildedRose` was
iterating over its items, it was invoking that method. This allowed each special item to have its own 
version of `updadeQuality` with some special conditions.

Conjured Item implementation works, but I'm not really happy with this solution.

### 2. Heavily inspired by Sandi Metz

In this approach I tried to apply what I learned by watching the [talk by Sandi Metz](https://youtu.be/8bZh5LMaSmE). 
Copying her solution 1-to-1 is not possible, for number of reasons:
1. She uses Ruby, not TypeScript.
2. Her version of the Kata is a bit simplified, which in my opinion is understandable, because when you give a talk you
   want to focus on the key concepts, and don't delve into some corner cases. Nevertheless, here are some differences:
   - Her `GildedRose` class doesn't have `items` that it iterates over, there is just one item being handled.
   - Some edge cases are not handled, e.g. in her implementation it'd be possible to increment the quality "Aged Brie"
     to 51.


## Resources

The exercise's content comes from [emilybache/GildedRose-Refactoring-Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata)
repo.

[RailsConf 2014 - All the Little Things by Sandi Metz](https://youtu.be/8bZh5LMaSmE)

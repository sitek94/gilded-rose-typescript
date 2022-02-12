# Gilded Rose Typescript

> 🚧 &nbsp; work in progress &nbsp;🚧

## Attempts

### 1. Violated Rules 🤦

Code: [attempt/1-violated-rules]()

The description says:

> (...) do not alter the Item class

And that's exactly what I did 🙈 I added `updateQuality` method to Item class, so that when `GildedRose` was
iterating over its items, it was invoking that method. This allowed each special item to have its own 
version of `updadeQuality` with some special conditions.

Conjured Item implementation works, but I'm not really happy with this solution.

## Resources

The exercise's content comes from [emilybache/GildedRose-Refactoring-Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata)
repo.

[RailsConf 2014 - All the Little Things by Sandi Metz](https://youtu.be/8bZh5LMaSmE)

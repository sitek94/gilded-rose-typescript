import { ItemName } from 'types'

export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }

  updateQuality() {}
}

export class GildedRose {
  DEFAULT_CLASS = Common
  SPECIALIZED_CLASSES: { [key: string]: typeof Item } = {
    [ItemName.AgedBrie]: AgedBrie,
    [ItemName.BackstagePasses]: BackstagePasses,
    [ItemName.Conjured]: Conjured,
    [ItemName.Sulfuras]: Sulfuras,
  }

  items: Item[]

  constructor(items: Item[] = []) {
    this.items = items.map(({ name, sellIn, quality }) => {
      const Class = this.SPECIALIZED_CLASSES[name] || this.DEFAULT_CLASS
      return new Class(name, sellIn, quality)
    })
  }

  updateQuality() {
    this.items.forEach((item) => item.updateQuality())
  }
}

class Common extends Item {
  updateQuality() {
    this.sellIn--

    if (this.canDecreaseQuality()) {
      this.decreaseQuality()
    }
    if (this.sellIn < 0 && this.canDecreaseQuality()) {
      this.decreaseQuality()
    }
  }

  canDecreaseQuality() {
    return this.quality > 0
  }

  decreaseQuality() {
    this.quality--
  }
}

class AgedBrie extends Item {
  updateQuality() {
    this.sellIn--

    if (this.canIncreaseQuality()) {
      this.increaseQuality()
    }

    if (this.sellIn < 0 && this.canIncreaseQuality()) {
      this.increaseQuality()
    }
  }

  canIncreaseQuality() {
    return this.quality < 50
  }

  increaseQuality() {
    this.quality++
  }
}

class BackstagePasses extends Item {
  updateQuality() {
    this.sellIn--

    if (this.sellIn < 0) {
      this.quality = 0
      return
    }

    if (this.canIncreaseQuality()) {
      this.increaseQuality()
    }

    if (this.sellIn < 10 && this.canIncreaseQuality()) {
      this.increaseQuality()
    }

    if (this.sellIn < 5 && this.canIncreaseQuality()) {
      this.increaseQuality()
    }
  }

  canIncreaseQuality() {
    return this.quality < 50
  }

  increaseQuality() {
    this.quality++
  }
}

class Sulfuras extends Item {}

class Conjured extends Item {
  updateQuality() {
    this.sellIn--

    if (this.canDecreaseQuality()) {
      this.decreaseQuality()
    }

    if (this.sellIn < 0 && this.canDecreaseQuality()) {
      this.decreaseQuality()
    }
  }

  canDecreaseQuality() {
    return this.quality > 0
  }

  decreaseQuality() {
    this.quality -= 2
  }
}

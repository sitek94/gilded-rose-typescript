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
  SPECIALIZED_CLASSES = {
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
      this.quality--
    }
    if (this.hasExpired() && this.canDecreaseQuality()) {
      this.quality--
    }
  }

  canDecreaseQuality() {
    return this.quality > 0
  }

  hasExpired() {
    return this.sellIn < 0
  }
}

class AgedBrie extends Item {
  updateQuality() {
    this.sellIn--

    if (this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality++
    }
  }
}

class BackstagePasses extends Item {
  updateQuality() {
    this.sellIn--
    if (this.hasExpired()) {
      return (this.quality = 0)
    }

    this.increaseQualityIfNotMax()

    if (this.sellIn < 10 && this.canIncreaseQuality()) {
      this.quality++
    }

    if (this.sellIn < 5 && this.canIncreaseQuality()) {
      this.quality++
    }
  }

  isMaxQuality() {
    return this.quality === 50
  }

  increaseQualityIfNotMax() {
    if (!this.isMaxQuality()) {
      this.quality++
    }
  }

  canIncreaseQuality() {
    return this.quality < 50
  }

  hasExpired() {
    return this.sellIn < 0
  }
}

class Sulfuras extends Item {}

class Conjured extends Item {
  updateQuality() {
    this.sellIn--

    if (this.quality > 0) {
      this.quality -= 2
    }

    if (this.sellIn < 0 && this.quality > 0) {
      this.quality -= 2
    }
  }
}

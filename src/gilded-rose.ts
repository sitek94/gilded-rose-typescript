export const AGED_BRIE = 'Aged Brie'
export const SULFURAS = 'Sulfuras, Hand of Ragnaros'
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
export const CONJURED = 'Conjured Mana Cake'

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
  items: Item[]

  constructor(items: Item[] = []) {
    this.items = items.map(({ name, sellIn, quality }) => {
      const Class = this.getClassFor(name)
      return new Class(name, sellIn, quality)
    })
  }

  updateQuality() {
    this.items.forEach((item) => item.updateQuality())
  }

  getClassFor(name: string) {
    switch (name) {
      case AGED_BRIE:
        return AgedBrie

      case BACKSTAGE_PASSES:
        return BackstagePasses

      case CONJURED:
        return Conjured

      case SULFURAS:
        return Sulfuras

      default:
        return Normal
    }
  }
}

class Normal extends Item {
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
    if (this.sellIn < 0) {
      return (this.quality = 0)
    }

    if (this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 10 && this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 5 && this.quality < 50) {
      this.quality++
    }
  }
}

class Sulfuras extends Item {
  updateQuality() {}
}

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

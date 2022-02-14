import { ItemName } from 'types'

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items.map((item) => {
      const { name, sellIn, quality } = item
      const args = [name, sellIn, quality] as const

      if (name === ItemName.Sulfuras) {
        return new SulfurasItem(...args)
      }

      if (name === ItemName.AgedBrie) {
        return new AgedBrieItem(...args)
      }

      if (name === ItemName.BackstagePasses) {
        return new BackstagePassesItem(...args)
      }

      if (name === ItemName.Conjured) {
        return new ConjuredItem(...args)
      }

      return item
    })
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality()
    }

    return this.items
  }
}

export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }

  updateQuality() {
    if (this.quality > 0) {
      this.quality = this.quality - 1
    }
    this.sellIn = this.sellIn - 1
    if (this.sellIn < 0) {
      if (this.quality > 0) {
        this.quality = this.quality - 1
      }
    }
  }
}

export class SulfurasItem extends Item {
  // "Sulfuras" never has to be sold or decreases in quality
  updateQuality() {}
}

export class AgedBrieItem extends Item {
  updateQuality() {
    this.sellIn = this.sellIn - 1

    if (this.quality < 50) {
      this.quality = this.quality + 1
    }

    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.quality = this.quality + 1
      }
    }
  }
}

export class BackstagePassesItem extends Item {
  updateQuality() {
    this.sellIn = this.sellIn - 1

    if (this.quality < 50) {
      this.quality = this.quality + 1
    }

    if (this.sellIn < 10) {
      if (this.quality < 50) {
        this.quality = this.quality + 1
      }
    }

    if (this.sellIn < 5) {
      if (this.quality < 50) {
        this.quality = this.quality + 1
      }
    }

    if (this.sellIn < 0) {
      this.quality = 0
    }
  }
}

export class ConjuredItem extends Item {
  updateQuality() {
    if (this.quality > 0) {
      this.quality = this.quality - 2
    }
    this.sellIn = this.sellIn - 1
    if (this.sellIn < 0) {
      if (this.quality > 0) {
        this.quality = this.quality - 2
      }
    }
  }
}

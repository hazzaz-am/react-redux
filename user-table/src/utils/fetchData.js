import Chance from 'chance'

const chance = new Chance()

export const fetchData = () => {
  return chance.name({ middle: true });
}
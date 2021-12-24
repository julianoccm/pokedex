export const handleStats = (statsList) => {
  const stats = {
    hp: statsList[0].base_stat,
    attack: statsList[1].base_stat,
    defense: statsList[2].base_stat,
    specialAttack: statsList[3].base_stat,
    specialDefense: statsList[4].base_stat,
    speed: statsList[5].base_stat,
  };

  return stats;
};

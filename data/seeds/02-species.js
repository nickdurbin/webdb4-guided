exports.seed = async (knex) => {
  await knex("species").insert([
    { name: "Star-nosed Mole" },
    { name: "Platypus" },
    { name: "Chameleon" },
    { name: "Snail" },
    { name: "Blue-footed Booby" },
    { name: "Anteater" },
    { name: "Minotaur" },
    { name: "Raccoon" },
    { name: "Flamingo" },
    { name: "Kookaburra" }, // id: 10
  ])
}

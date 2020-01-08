exports.seed = async (knex) => {
  await knex("zoos").insert([   
    { name: "San Diego Zoo", address: "2920 Zoo Dr, San Diego, CA 92101" },
    { name: "St. Louis Zoo", address: "Government Dr, St. Louis, MO 63110" },
  ])
}

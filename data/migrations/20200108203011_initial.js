exports.up = async function(knex) {
  await knex.schema.createTable('zoos', tbl => {
    tbl.increments("id")
    tbl.string("name").notNullable()
    tbl.string("address").notNullable()
  })
  await knex.schema.createTable("species", tbl => {
    tbl.increments("id")
    tbl.string("name").notNullable()
  })
  await knex.schema.createTable('animals', tbl => {
    tbl.increments("id")
    tbl.string("name").notNullable()

    tbl.integer("species_id")
      .notNullable()
      .references("id")
      .inTable("species")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
  await knex.schema.createTable("zoos_animals", tbl => {
    tbl.integer("zoo_id")
      .notNullable()
      .references("id")
      .inTable("zoos")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    tbl.integer("animal_id")
      .notNullable()
      .references("id")
      .inTable("animals")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    tbl.date("from")
    tbl.date("to")

    tbl.primary(["zoo_id", "animal_id"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("zoos_animals")
  await knex.schema.dropTableIfExists("animals")
  await knex.schema.dropTableIfExists("species")
  await knex.schema.dropTableIfExists("zoos")
};

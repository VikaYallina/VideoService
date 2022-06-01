'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //     'employees',
    //     [
    //       {
    //         firstname: "Bob",
    //         middlename: "G.",
    //         lastname: "Jefferson",
    //         birthdate: "01.01.1960"
    //       },
    //       {
    //         firstname: "Lol",
    //         middlename: "G.",
    //         lastname: "Jefferson",
    //         birthdate: "12.12.1960"
    //       }
    //     ],
    //     {}
    // )

    await queryInterface.bulkInsert(
        'users',
        [
          {
            email: "mail@mail.com",
            password:"pass",
              createdAt: new Date(),
              updatedAt: new Date()
          }
        ],
        {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // fetch employees from DB
    const employees = await queryInterface.sequelize.query(
      `SELECT id, name FROM employees ORDER BY id ASC;`
    );

    const employeeRows = employees[0];

    // Make sure we have at least 3 employees
    if (employeeRows.length < 3) {
      throw new Error("Not enough employees in the database to seed attendances.");
    }

    await queryInterface.bulkInsert('attendances', [
      {
        employee_id: employeeRows[0].id, // Abdulla
        date: '2025-05-12',
        status: 'Present',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: employeeRows[0].id, // Abdulla
        date: '2025-05-13',
        status: 'Absent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: employeeRows[1].id, // John Doe
        date: '2025-05-12',
        status: 'Present',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: employeeRows[2].id, // Jane Smith
        date: '2025-05-13',
        status: 'Present',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
  },
};

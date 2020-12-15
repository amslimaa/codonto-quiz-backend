module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anamneses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      pacient_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pacients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      had_symptom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      symptoms: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      day_of_first_sympton: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      had_covid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date_of_diagnosis: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      covid_cases_cycle: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        dafaultValue: false,
      },
      death_case_by_covid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      can_be_consulted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('anamneses');
  },
};

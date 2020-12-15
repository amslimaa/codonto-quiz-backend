module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consults', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      number_of_office: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_of_consultation: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pacient_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pacients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        references: { model: 'alunos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    await queryInterface.dropTable('consults');
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pacients', 'gen', {
      type: Sequelize.CHAR,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('pacients', 'gen');
  },
};

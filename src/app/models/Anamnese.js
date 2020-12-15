import Sequelize, { Model } from 'sequelize';

class Anamnese extends Model {
  static init(sequelize) {
    super.init(
      {
        had_symptom: Sequelize.BOOLEAN,
        symptoms: Sequelize.STRING,
        day_of_first_sympton: Sequelize.DATE,
        had_covid: Sequelize.BOOLEAN,
        date_of_diagnosis: Sequelize.DATE,
        covid_cases_cycle: Sequelize.BOOLEAN,
        death_case_by_covid: Sequelize.BOOLEAN,
        can_be_consulted: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (anamnese) => {
      if (
        anamnese.had_covid ||
        anamnese.had_symptom ||
        anamnese.covid_cases_cycle ||
        anamnese.death_case_by_covid
      ) {
        anamnese.can_be_consulted = false;
      } else {
        anamnese.can_be_consulted = true;
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pacient, {
      foreignKey: 'pacient_id',
      as: 'pacient',
    });
  }
}
export default Anamnese;

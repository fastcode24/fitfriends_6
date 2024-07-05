import { Questionnaire } from "@pages";
import { Level, TrainingTime } from "@types";

interface QuestionnaireFormError {
  trainingType: string | null;
  trainingTime: string | null;
  level: string  | null;
  caloriesPerDay: string | null;
  calories: string | null;
}

export const validateQuestionnaire = (questionnaire: Questionnaire): QuestionnaireFormError => {
  const errors: QuestionnaireFormError = {
    trainingType: !Array.isArray(questionnaire.trainingType) || questionnaire.trainingType.length === 0
    ? 'Необходимо выбрать хотя бы один тип тренировки'
    : null,
    trainingTime: !Object.values(TrainingTime).includes(questionnaire.trainingTime)
      ? 'Указанное время не соответствует доступным вариантам'
      : null,
    level: !Object.values(Level).includes(questionnaire.level)
      ? 'Указанный уровень не соответствует доступным вариантам'
      : null,
    caloriesPerDay: typeof questionnaire.caloriesPerDay !== 'number' || questionnaire.caloriesPerDay <= 0
      ? 'Значение должно быть > 0'
      : null,
    calories: typeof questionnaire.calories !== 'number' || questionnaire.calories <= 0
      ? 'Значение должно быть > 0'
      : null
  };
  return errors;
};

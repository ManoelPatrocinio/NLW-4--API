import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/surveysUser";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {
  
}

export { SurveysUsersRepository}
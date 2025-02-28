import CustomService from "./customService"
import UserManager from "../database/managers/UserManager"

const UserService = new CustomService(UserManager)

export const {readService, readOneService, readByEmailService, updateService, createService, destroyService} = UserService
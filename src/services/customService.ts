class CustomService {
  manager: any

  constructor(manager: any) {
    this.manager = manager;
  }
  
   readService = async (filter: any) => {
    try {
      const all = await this.manager.read(filter)
      return all
    } catch (error) {
      throw error
    }
  }

   readOneService = async (id: string) => {
    try {
      const one = await this.manager.readOne(id) 
      return one
    } catch (error) {
      throw error
    }
  }

  readByEmailService = async (email: string) => {
    try {
      const one = await this.manager.readByEmail(email) 
      return one
    } catch (error) {
      throw error
    }
  }

  createService = async (data: any) => {
    try {
      const one = await this.manager.create(data)
      return one
    } catch (error) {
      throw error
    }
  }

  updateService = async (id: string, data: any) => {
    try {
      const one = await this.manager.update(id, data)
      return one
    } catch (error) {
      throw error
    }
  }

  destroyService = async (id: string) => {
    try {
      const one = await this.manager.destroy(id)
      return one
    } catch (error) {
      throw error
    }
  }
}

export default CustomService
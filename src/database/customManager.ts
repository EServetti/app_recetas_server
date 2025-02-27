import { ObjectId } from "mongoose";
import {PaginateOptions} from "../../types" 

class CustomManager {
  Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  async create(data: any) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read(filter: any) {
    try {
        const all = await this.Model.find(filter)
        return all
    } catch (error) {
        throw error
    }
  }

  async paginate (filter: any, paginate: PaginateOptions) {
    try {
      const all = await this.Model.paginate(filter, paginate)
      return all
    } catch (error) {
      throw error
    }
  }

  async readOne (id: string) {
    try {
        const one = await this.Model.findOne({ _id: id })
        return one
    } catch (error) {
        throw error
    }
  }

  async readByEmail (email: string) {
    try {
      const one = await this.Model.findOne({email})
      return one
    } catch (error) {
      throw error
    }
  }

  async update (id: ObjectId, data: any) {
    try {
        const one = await this.Model.findByIdAndUpdate(id, data, {new: true})
        return one
    } catch (error) {
        throw error
    }
  }

  async destroy (id: ObjectId) {
    try {
        const one = await this.Model.findByIdAndDelete(id)
        return one
    } catch (error) {
        throw error
    }
  }
}

export default CustomManager
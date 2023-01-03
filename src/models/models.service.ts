import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './model.entity';

@Injectable()
export class ModelsService {
    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>,
    ) { }
    async findAll(): Promise<Model[]> {
        return await this.modelRepository.find();
    }

    async create(model: Model): Promise<Model> {
        return await this.modelRepository.save(model);
    }

    async update(model: Model): Promise<UpdateResult> {

        return await this.modelRepository.update(model.id, model);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.modelRepository.delete(id);
    }

    public async setModel(modelId: number, modelUrl: string) {
        this.modelRepository.update(modelId, { model: modelUrl });
    }
}

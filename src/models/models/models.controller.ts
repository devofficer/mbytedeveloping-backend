import { Controller, Get, Res, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Model } from '../model.entity';
import { ModelsService } from '../models.service';
import { UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('models')
export class ModelsController {
  SERVER_URL: string = "http://localhost:3000/";

  constructor(private modelsService: ModelsService) { }

  @Get()
  index(): Promise<Model[]> {
    return this.modelsService.findAll();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './models',

        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  async create(@Body() modelData: Model, @UploadedFile() file): Promise<any> {
    return this.modelsService.create(modelData, `${this.SERVER_URL}files/${file.path}`);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() modelData: Model): Promise<any> {
    modelData.id = Number(id);
    console.log('Update #' + modelData.id)
    return this.modelsService.update(modelData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.modelsService.delete(id);
  }

  @Get('files/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'models' });
  }
}

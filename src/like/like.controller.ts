import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService,
        @Inject('LIKE_SERVICE') private client: ClientProxy,
    ) {

    }

    @EventPattern('like_created_gateway')
    async create(data) {
        console.log("like_created_gateway data", data);
        const like = await this.likeService.create(data);
        this.client.emit('like_created', like);
        return like;
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.likeService.get(id);
    }


    @EventPattern('like_updated_gateway')
    async update(data) {
        console.log("like_updated_gateway", data);
        await this.likeService.update(data.id, data);
        const like = await this.likeService.get(data.id);
        console.log("post updated", like);
        this.client.emit('like_updated', like);
        return like;
    }

    @EventPattern('like_deleted_gateway')
    async delete(id) {
        console.log("like deleted id", id);
        this.likeService.delete(id);
        this.client.emit('like_deleted', id);
        return HttpStatus.NO_CONTENT;
        
    }
}

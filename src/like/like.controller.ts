import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService,
        @Inject('LIKE_SERVICE') private client: ClientProxy,
    ) {

    }

    // @Get()
    // all() {
    //     return this.postService.all();
    // }

    // @EventPattern('hello')
    // async hello(data: string) {
    //     console.log(data);
    // }

    // @Post()
    // async create(
    //     @Body('content') content: string,
    //     @Body('userId') userId: number,
    // ) {
    //     const post = await this.postService.create({ content, userId })
    //     console.log("post created", await post);
    //     this.client.emit('post_created', post);
    //     return post;
    // }

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

    // @Put(':id')
    // async update(
    //     @Param('id') id: number,
    //     @Body('content') content: string,
    //     @Body('userId') userId: string,
    // ) {
    //     await this.postService.update(id, {content, userId});
    //     const post = await this.postService.get(id);
    //     console.log("post updated", post);
    //     this.client.emit('post_updated', post);
    //     return post;
    // }
    @EventPattern('like_updated_gateway')
    async update(data) {
        console.log("like_updated_gateway", data);
        await this.likeService.update(data.id, data);
        const like = await this.likeService.get(data.id);
        console.log("post updated", like);
        this.client.emit('like_updated', like);
        return like;
    }

    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     this.postService.delete(id);
    //     this.client.emit('post_deleted', id);
    //     return HttpStatus.NO_CONTENT;
    // }
    @EventPattern('like_deleted_gateway')
    async delete(id) {
        console.log("like deleted id", id);
        this.likeService.delete(id);
        this.client.emit('like_deleted', id);
        return HttpStatus.NO_CONTENT;
        
    }
}

import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService,
        @Inject('POST_SERVICE') private client: ClientProxy,
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

    @EventPattern('post_created_gateway')
    async create(data) {
        console.log("post_created_gateway data", data);
        const post = await this.postService.create(data);
        this.client.emit('post_created', post);
        return post;
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.postService.get(id);
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
    @EventPattern('post_updated_gateway')
    async update(data) {
        console.log("post_updated_gateway", data);
        await this.postService.update(data.id, data);
        const post = await this.postService.get(data.id);
        console.log("post updated", post);
        this.client.emit('post_updated', post);
        return post;
    }

    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     this.postService.delete(id);
    //     this.client.emit('post_deleted', id);
    //     return HttpStatus.NO_CONTENT;
    // }
    @EventPattern('post_deleted_gateway')
    async delete(id) {
        console.log("post deleted id", id);
        this.postService.delete(id);
        this.client.emit('post_deleted', id);
        return HttpStatus.NO_CONTENT;
        
    }
}

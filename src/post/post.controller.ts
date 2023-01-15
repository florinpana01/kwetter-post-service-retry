import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService,
        @Inject('POST_SERVICE') private client: ClientProxy,
    ) {

    }


    @EventPattern('post_created_gateway')
    async create(data) {
        console.log("post_created_gateway data", data);
        const post = await this.postService.create(data);
        this.client.emit('post_created', post);
        return post;
    }

    @EventPattern('post_request_all')
    async all() {
        console.log('The complete post list:');
        return this.postService.all();
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.postService.get(id);
    }

    @EventPattern('post_updated_gateway')
    async update(data) {
        console.log("post_updated_gateway", data);
        await this.postService.update(data.id, data);
        const post = await this.postService.get(data.id);
        console.log("post updated", post);
        this.client.emit('post_updated', post);
        return post;
    }

    @EventPattern('post_deleted_gateway')
    async delete(id) {
        console.log("post deleted id", id);
        this.postService.delete(id);
        this.client.emit('post_deleted', id);
        return HttpStatus.NO_CONTENT;
        
    }
}
